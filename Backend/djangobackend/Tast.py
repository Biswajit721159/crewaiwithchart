from pydantic import BaseModel
import json
import re

class SQLQuery(BaseModel):
    query: str

def extract_sql_query(text: str) -> SQLQuery:
    # Use regular expression to find SQL query within triple backticks
    sql_match = re.search(r'```SQL(.*?)```', text, re.DOTALL)
    if sql_match:
        sql_query = sql_match.group(1).strip()
        return SQLQuery(query=sql_query)
    else:
        raise ValueError("No SQL query found in the input text.")

def output_json(model_instance: BaseModel) -> str:
    return model_instance.json()

# Example usage
if __name__ == "__main__":
    # Given string containing the SQL query
    crew_ai_response = """
    Assuming we have a table called 'orders' and we have a date field 'order_date' in it, the SQL query would be:

    ```SQL
    SELECT TO_CHAR(order_date, 'Month') AS month, COUNT(*) AS order_count
    FROM orders
    WHERE EXTRACT(YEAR FROM order_date) = 2004
    GROUP BY TO_CHAR(order_date, 'Month')
    ORDER BY MIN(order_date);
    ```

    This query will return the count of orders for each month in the year 2004.

    For the llm function and to return the result in JSON format, I would need more specific information about the function and the SQL dialect being used. In PostgreSQL, for example, you could use row_to_json to convert rows to JSON format.
    """

    # Extract SQL query
    sql_query_model = extract_sql_query(crew_ai_response)

    # Output as Pydantic model
    print("Pydantic Model:")
    print(sql_query_model)

    # Output as JSON
    print("\nJSON Output:")
    json_output = output_json(sql_query_model)
    print(json_output)
