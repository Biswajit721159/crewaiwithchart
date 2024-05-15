from crewai import Task

def callback_function(output):
    print(f"""
          
        Task completed!
        Task: {output.description}
        Output: {output.raw_output}
        
    """)


class Tasks():   
    def TaskFunction(self,agent):
        return Task(
            description="""
            
            You are given many question . you need to return a query for last question and also analysis the previous question . 
            Try to give a correct  SQL query such that the field name must be present into the function calling llm array`s .  
            
            """,
            expected_output=
            """
                Return a json data where the first field is contain the the name query . 
                The result data must be validate using this method -json.loads(result) where result is the result what you need to return.
                now you need to return that into a json format such that we can convert into a json.please do not return any other description or other thing .
                example - {
                    "query": "give sql query",
                } . 
                the Sql query must be a valid Sql query do not using ';' '.' etc at end of the query.
                Give the correct query where column name must be correct which i am provied to the agent.
                Note do not return other thing . please follow the rules. 
                please do not return like ```type or other thing {`query`:"give sql query"}``` , ``` anything ```
                
            """,
            agent=agent,
            # callback=callback_function, 
            # output_json=True  
        )
        
    # def OutputChecker(self,agent):
    #     return Task(
    #         description='Assume that you are Output checker into our company',
    #         expected_output="""
            
    #         Actully our SQL Expert agent give us some output which is a string .
    #         Now you work is to check if it is possibe to convert into a Json data.
    #         example ```{"query":"your sql query"}``` ,here if you see this is not possible to convert into json data because the data is into "```".
    #         you need to return the data into  
    #         example - 
    #         {
    #             "query": "give sql query",
    #         }   
    #         do not return any description or other thing. only return what i want .        
    #         """,
    #         agent=agent,
    #     )