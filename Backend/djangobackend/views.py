from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
from asgiref.sync import sync_to_async

import os
from dotenv import load_dotenv
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
os.environ["OPENAI_API_KEY"] = api_key
from djangobackend.Task import Tasks
from djangobackend.Agent import Agents
from crewai import Crew, Process
import json

from openai import OpenAI
from djangobackend.Function import functiondata
from djangobackend.Getdata import getAnyInformation
from djangobackend.FunctionForQuery import FunctionForQuery

input = """
order count with month in year of 2004
"""
@csrf_exempt 
async def Order_Product(request):
    try:
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        question = body_data.get('question', [])
        
        SQLExpertAgent = Agents().SQLExpert(question)
        # outputCheckerAgent=Agents().outputChecker()
        
        SQLExpertTask = Tasks().TaskFunction(SQLExpertAgent)
        # OutputCheckerTask=Tasks().OutputChecker(outputCheckerAgent)
        
        crew = Crew(
            agents=[SQLExpertAgent],
            tasks=[SQLExpertTask],
            process=Process.sequential 
        )
        result = crew.kickoff()
        return  await TestToGiveChatgpt(result)
        return  await giveCorrectResult(result)
    except Exception as error:
            print("Error is ok ######### ",error)
            return JsonResponse({"Normal": ["Your maximum context is reached or your query is invalid. Please refresh this page and write your query again."]}, safe=False)
    

async def giveCorrectResult(query):
    try:
        print("query is ###",query)
        query = json.loads(query)
        functionResponse = await getAnyInformation(query)
        return JsonResponse({ "Normal": functionResponse },safe=False)
    except Exception as error:
        print(error)
        return {"Normal": ["Your maximum context is reached or your query is invalid. Please refresh this page and write your query again."]}



async def TestToGiveChatgpt(query):
    try:
        question = [{
            'role': 'user',
            'content': query
        }]
        print("question is ",question,'\n\n')
        api_key = os.getenv("OPENAI_API_KEY")
        client = OpenAI(
            api_key=api_key,
        )
        response = client.chat.completions.create(
            model="gpt-4",
            messages=question,
            functions=FunctionForQuery,
            function_call="auto"
        )
        responseMessage = response.choices[0].message
        print(responseMessage)
        if responseMessage.function_call:
            availableFunctions = {
                "getAnyInformation": getAnyInformation,
            }
            functionName = responseMessage.function_call.name
            functionToCall = availableFunctions.get(functionName)
            functionArgs = json.loads(responseMessage.function_call.arguments)
            functionResponse = await functionToCall(functionArgs)
            
            # print("functionResponse", functionResponse, '\n\n\n')
            return JsonResponse({ "Normal": functionResponse },safe=False)
        else: return JsonResponse({"Normal": ["No result found !"] },safe=False)
    except Exception as error:
        print(error)
        return {"Normal": ["Your maximum context is reached or your query is invalid. Please refresh this page and write your query again."]}

@sync_to_async
def get_data_from_mysql(query):
    with connection.cursor() as cursor:
        cursor.execute(query)
        rows = cursor.fetchall()
        field_names = [desc[0] for desc in cursor.description]
        formatted_data = []
        for row in rows:
            row_dict = dict(zip(field_names, row))
            formatted_data.append(row_dict)
    return formatted_data

@csrf_exempt    
async def sendToBackend(res):
    if res.method == "POST":
        try:
            body_unicode = res.body.decode('utf-8')
            body_data = json.loads(body_unicode)
            question = body_data.get('question', [])
            api_key = os.getenv("OPENAI_API_KEY")
            client = OpenAI(
                api_key=api_key,
            )
            response = client.chat.completions.create(
                model="gpt-4",
                messages=question,
                functions=functiondata,
                function_call="auto"
            )
            responseMessage = response.choices[0].message

            if responseMessage.function_call:
                availableFunctions = {
                    "getAnyInformation": getAnyInformation,
                }
                functionName = responseMessage.function_call.name
                functionToCall = availableFunctions.get(functionName)
                functionArgs = json.loads(responseMessage.function_call.arguments)
                functionResponse = await functionToCall(functionArgs)

                return JsonResponse({"Normal": functionResponse}, safe=False)
            else:
                return JsonResponse({"Normal": [responseMessage.content]}, safe=False)
        except Exception as error:
            print(error)
            return JsonResponse({"Normal": ["Your maximum context is reached or your query is invalid. Please refresh this page and write your query again."]}, safe=False)
    else:
        return JsonResponse({"Normal":["Sorry method is not found !"]}, safe=False)
