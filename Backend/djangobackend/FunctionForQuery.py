FunctionForSubject = [
    {
        "name": "getSubjectInformation",
        "description": """ the input contain a SQL Query . if multiple SQL Query is present then return last SQL Query. """,
        "parameters": {
            "type": "object",
            "properties": {
                "Subjects": {
                    "type": "Array",
                    "description": "Return all those subject into an arrays",
                },
            },
            "required": ["query", "graph"],
        },
    }
]
