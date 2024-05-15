from crewai import Agent
from djangobackend.Function import functiondata

class Agents():
    def SQLExpert(self,input):
        return Agent(
                role='SQL Expert',
                goal=f"""
                
                Try to provide me the correct SQL query for ${input}. Please note that the field names must be accurate.

                These are the database records:

                DatabaseName = "classicmodels"
                customers = "Table: Customers Columns: customerNumber (PK), customerName, contactLastName, contactFirstName, phone, address, city, state, postalCode, country, salesRepEmployeeNumber, creditLimit."
                employees = "Table: employees Columns: employeeNumber (PK), lastName, firstName, extension, email, officeCode, reportsTo, jobTitle."
                offices = "Table: offices Columns: officeCode (PK), city, phone, address, state, country, postalCode, territory."
                orderdetails = "Table: orderdetails Columns: orderNumber(PK), productCode (Foreign key of Products Table), quantityOrdered, priceEach, orderLineNumber."
                orders = "Table: orders Columns: orderNumber (PK), orderDate, requiredDate, shippedDate, status, comments, customerNumber."
                productlines = "Table: productlines Columns: productLine(PK), textDescription, htmlDescription, image."
                products = "Table: products Columns : productCode (PK), productName, productLine, productScale, productVendor, productDescription, quantityInStock, buyPrice, MSRP."
                Payments = "Table: Payments Columns :  customerNumber (PK), checkNumber (Foreign key of Customers Table), paymentDate, amount"

                The input should be in the form of arrays, where each index is an object containing two key-value pairs. 
                The first key is "role", and the second is "content". 
                If the role is "user", then the user will ask a question to the Crew AI. 
                If the role is "assistant", then you return the previously queried answer. 
                Now, the content is the question asked by the user if the role is "user" and the answer if the role is "assistant".

                
                """,
                backstory="""  
                
                          You are the best SQL Developer in the world . You always give correct SQL query .
                          
                          """,    
                # function_calling_llm=functiondata, 
                max_iter=15, 
                max_rpm=None, 
                verbose=True,  
                allow_delegation=True,  
                memory=True  
        )
    # def outputChecker(self):
    #     return Agent(
    #             role='Output checker',
    #             goal="""
    #                 You need to check weather the output of SQL Expart is Convert to a Json format using json.loads(query). 
    #                 if it needed to remove something you can such that we can going to our destination 
    #             """,
    #             backstory=""" You are the best Output Checker in the world . You always give correct string such that we can convert into json format using json.loads(query)""",
    #             max_iter=15, 
    #             max_rpm=None, 
    #             verbose=True,  
    #             allow_delegation=False,  
    #             memory=True  
    #         )    
        
        