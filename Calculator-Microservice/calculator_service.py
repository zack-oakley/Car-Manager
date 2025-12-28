# Joshua Cabalka
# Letaw, Mali
# CS361
# 11/22/2025
# This program contains the code for the caluclator microservice.
# It uses flask to create a web app that takes in numbers, performs a calculation
# and then returns the result, or an error message

from flask import Flask, request, jsonify

app = Flask(__name__)

# Route definition for the /calculate URL path that accepts POST requests
@app.route("/calculate", methods=["POST"])

# Function for handling POST requests to /calculate
# Reads two numbers and an operation from the request
# Performs calculation and returns result as a JSON
def calculate():
    # Read the JSON data from the HTTP request
    data = request.get_json(silent=True)

    # If no JSON body, set data to empty
    if data is None:
        data = {}

    # Get the requested operation
    operation = data.get("operation")
    # Get first number from JSON
    a_value = data.get("a")
    # Get the second number from JSON
    b_value = data.get("b")

    # Check all required fields
    if operation is None or a_value is None or b_value is None:
        # Return an error message and 400 status code
        return jsonify({
            "ok": False,
            "error": "Missing fields: 'operation', 'a' and 'b' are required."
        }), 400
    
    # Convert operation value to a string
    operation_text = str(operation).strip()
    # Convert the operation words to a lower case
    operation_lower = operation_text.lower()

    # Map all operation inputs to a single operation name, 
    # For example "add" and "+" both become "add"
    if operation_lower == "add" or operation_text == "+":
        operation = "add"
    elif operation_lower == "subtract" or operation_text == "-":
        operation = "subtract"
    elif operation_lower == "multiply" or operation_text == "*":
        operation = "multiply"
    elif operation_lower == "divide" or operation_text == "/":
        operation = "divide"
    else:
        # If the operation is not recognized, return an error
        return jsonify({
            "ok": False,
            "error": "Invalid operation. Use 'add', '+', 'subtract', '-', 'multiply', '*', 'divide' or '/'."
        }), 400
    
    # Convert numbers to float
    try:
        a_number = float(a_value)
        b_number = float(b_value)
    except (TypeError, ValueError):
        # If conversion fails, return an error
        return jsonify({
            "ok": False,
            "error": "Invalid operands: 'a' and 'b' must be numbers."
        }), 400
    
    # Perform the correct operation 
    if operation == "add":
        result = a_number + b_number
    elif operation == "subtract":
        result = a_number - b_number
    elif operation == "multiply":
        result = a_number * b_number
    elif operation == "divide":
        # Check for division by zero
        if b_number == 0:
            # Return an error message to avoid crashing
            return jsonify({
                "ok": False,
                "error": "Division by zero is not allowed"
            }), 400
        result = a_number / b_number
    else:
        # This should never happen, but just in case
        return jsonify({
            "ok": False,
            "error": "Unexpected operation error."
        }), 500
    
    # Everything worked, so return the result and inputs in a JSON response
    return jsonify({
        "ok": True,
        "operation": operation,
        "a": a_number,
        "b": b_number,
        "result": result
    }), 200

# Now we can define a route for /health URL that accepts GET requests
@app.route("/health", methods=["GET"])

# Function for other programs to check if microservice is running
def health_check():
    return jsonify({"status": "ok"}), 200

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5004)