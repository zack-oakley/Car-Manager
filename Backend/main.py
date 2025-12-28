from flask import Flask, request, Response, jsonify
import requests

app = Flask(__name__)

item_storage_microservice_url = "http://127.0.0.1:8000/storage/zack"
image_microservice_url = "http://127.0.0.1:8080/images"
issue_microservice_url = "http://127.0.0.1:8015/issues"
quote_microservice_url = "http://127.0.0.1:8005/quote"


# ITEM STORAGE ROUTES 
# Create new car record
@app.post("/cars")
def create_car():
    data = request.json
    response = requests.post(item_storage_microservice_url, json=data)
    response_data = response.json()
    return jsonify(response_data), 201

# Retrieve all records
@app.get("/cars")
def get_cars():
    response = requests.get(item_storage_microservice_url)
    response_data = response.json()
    return jsonify(response_data), 200


# Retrieve one record
@app.get("/cars/<id>")
def get_car(id):
    response = requests.get(item_storage_microservice_url + '/' + id)
    response_data = response.json()
    return jsonify(response_data), 200


# Delete a record
@app.delete("/cars/<id>")
def delete_car(id):
    response = requests.delete(item_storage_microservice_url + '/' + id)
    response_data = response.json()
    return jsonify(response_data), 200


# ------------------------------------------------------------------------------
# IMAGE ROUTES
# Uploaded an image
@app.post("/cars/<id>/image")
def upload_car_image(id):
    file = request.files['file']
    files = {"file": file}
    response = requests.post(image_microservice_url + '/' + id, files=files)
    return "", response.status_code


# Get an image
@app.get("/cars/<id>/image")
def get_image(id):
    response = requests.get(image_microservice_url + '/' + id)

    return Response(response.content, mimetype="image/png")


# delete an image
@app.delete("/cars/<id>/image")
def delete_image(id):
    response = requests.delete(image_microservice_url + '/' + id)
    return "", response.status_code


# -----------------------------------------------------------------------------
# ISSUES ROUTES
# get all issues
@app.get('/issues')
def get_issues():
    response = requests.get(issue_microservice_url)
    response_data = response.json()
    return jsonify(response_data), 200


# add and issue
@app.post('/issues')
def post_issue():
    data = request.get_json()
    response = requests.post(issue_microservice_url, json=data)
    return "", 201


# -----------------------------------------------------------------------------
# QUOTES ROUTES
# get a quote
@app.get("/quotes/<id>")
def get_quote(id):
    response = requests.get(quote_microservice_url + '/' + id)
    response_data = response.json()
    return jsonify(response_data), 200

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8010, debug=True)

