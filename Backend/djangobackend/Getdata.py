from dotenv import load_dotenv
import aiomysql
import os
load_dotenv()
errormess = "While processing your request, we are noticing that something is missing."

async def getAnyInformation(query):
    try:
        query = query['query']
        result=await get_data_from_mysql(query)
        if isinstance(result, list) and len(result) == 0:
            return [f"We have not found any result with your query '{query}'. "]
        elif not isinstance(result, list):
            return [result]
        result.append({"output": getdata(result)})
        result.insert(0, {"Your query": query})
        return result
    except Exception as e:
        result = [errormess]
        return result

async def get_data_from_mysql(query):
    try:
        connection = await dbConfig()
        if connection:
            async with connection.cursor() as cursor:
                sql = query  
                await cursor.execute(sql)
                result = await cursor.fetchall()
                field_names = [desc[0] for desc in cursor.description]
                formatted_data = []
                for row in result:
                    row_dict = dict(zip(field_names, row))
                    formatted_data.append(row_dict)                  
                return formatted_data
        else:
            return []
    except Exception as e:
            return []
    
def getdata(result):
    try:
        output = "Here is Your output: \n"
        for i, item in enumerate(result):
            output += f"{i + 1}. "
            for key, value in item.items():
                keydata = key
                if keydata[0].islower():
                    keydata = keydata[0].upper() + keydata[1:]
                splittedArray = key.split('_')
                data = ""
                for j, s in enumerate(splittedArray):
                    if j == 0:
                        if s[0].islower():
                            s = s[0].upper() + s[1:]
                        data += s
                    else:
                        data += " " + s
                output += f" {data} - {value} \n"
            output += '\n'
        return output
    except Exception as e:
        return errormess


async def dbConfig():
    try:
        db_config = {
            'host': os.environ.get('MYSQL_Host'),
            'user': os.environ.get('MYSQL_User'),
            'password': os.environ.get('MYSQL_Password'),
            'db': os.environ.get('MYSQL_Schema_Name'),
            'autocommit': True
        }
        connection = await aiomysql.connect(**db_config)
        if not connection:
            return None
        else:
            return connection
    except Exception as e:
        print("Error connecting to the database:", e)
        return None


# data=await get_data_from_mysql("SELECT YEAR(orderDate) as Year, MONTH(orderDate) as Month, COUNT(*) as OrderCount FROM orders GROUP BY Year, Month")