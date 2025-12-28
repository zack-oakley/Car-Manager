# CS361-calculator_service
Performs basic arithmetic operations for other applications

Purpose:
This microservice handles request for simple calculations so applications can compute addition, subtraction, multiplication, and division

It provides the following:
- Arithmetic between two numbers
- Support for both operation words and symbols
- Safe division that returns an error message instead of crashing
- JSON responses for other programs to use

*Getting Started*

-Requirements-
- Python 3.10 or higher
- Flask and requests libraries

-Install Dependencies-
bash
pip install flask requests

*Running the Microservice*
From the folder containing calculator_service.py:
    python calculator_service.py
This service runs locally on:
    http://localhost:5004

*Communication Contract*
How to REQUEST data:

1. Perform Arithmetic Operations (Endpoint: POST /calculate)
Description: Performs one of four operations on two numbers

Accepted operation values:
- Words: "add", "subtract", "multiply", "divide"
- Symbols: "+", "-", "*", "/"

Request JSON example (using words):
    {
        "operation": "add",
        "a": 10,
        "b": 5
    }
Request JSON example (using symbols):
    {
        "operation": "+",
        "a": 10,
        "b": 5
    }
Fields:
- operation: required, one of the values listed above
- a: required, first number (integer or float)
- b: required, second number (integer or float)

Successful Response (200) addition example:
    {
        "ok": true,
        "operation": "add",
        "a": 10.0,
        "b": 5.0,
        "result": 15.0
    }

Successful Response (200) divisino example:
    {
        "ok": true,
        "operation": "divide,
        "a": 10.0,
        "b": 2.0,
        "result": 5.0
    }
- Safe Division behavior:
If operation is "divide" or "/" and b is 0, the service will return an error message and *never* crash.

- Division by zero example:
    {
        "ok" false,
        "error": "Division by zero is not allowed."
    }

- Other possible error responses:
    {
        "ok": false,
        "error": "Missing fields, 'operation', 'a', and 'b' are required."
    }

    {
        "ok": false,
        "error": "Invalid operands: 'a' and 'b' must be numbers."
    }

    {
        "ok": false,
        "error": "Invalid operation. Use 'add', '+', 'subtract', '-', 'multiply', '*', 'divide', or '/'."
    }

- Example Python call (addition):
    {
        import requests

        response = requests.post(
            "http://localhost:5004/calculate",
            json={"operation": "add", "a": 10, "b": 5}
        )
        print(response.json())
    }

- Example Python call (division with symbol):
    {
        import requests

        response = requests.post(
            "http://localhost:5004/calculate"",
            json={"operation": "/", "a": 10, "b": 2}
        )
        print(response.json())
    }

- Health check (Endpoint: GET /health)
Request example:
    {
        GET / health HTTP/1.1
        Host: localhost:5004
    }
Successful Response (200):
    {
        "status": "ok"
    }

*How to RECIEVE data*
- All responses are JSON formatted (Content-TYpe: application/json)
- Successful calculation responses return HTTP 200 with:
    - ok: True
    - operation: the internal operation name ("add", "subtract", "multiply" or "divide")
    - a, b: the numeric inputs as floats
    - result: the numeric result
- Error responses return HTTP 400 with:
    - ok: false
    - error: a short explanation of what went wrong
- The microservice never returns plaintext for calculations, everything is JSON

UML Sequence Diagram:

```mermaid
sequenceDiagram
    participant Client as Client Program
    participant CalcService as Calculator Microservice

    Client->>CalcService: POST /calculate {"operation":"add","a":10,"b":5}
    CalcService->>CalcService: Validate fields and convert to numbers
    CalcService->>CalcService: Perform addition (10 + 5)
    CalcService-->>Client: 200 OK {"ok":true,"result":15.0}

    Client->>CalcService: POST /calculate {"operation":"divide","a":10,"b":0}
    CalcService->>CalcService: Detect division by zero
    CalcService-->>Client: 400 Bad Request {"ok":false,"error":"Division by zero is not allowed."}

    Client->>CalcService: GET /health
    CalcService-->>Client: 200 OK {"status":"ok"}