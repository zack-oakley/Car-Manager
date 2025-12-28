from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import ObjectId


app = Flask(__name__)


# Connect to MogoDB, Enter your own connection details
client = MongoClient("Connecttion")
db = client["DB"]
items = db['data']


# This function creates a data entry for a student
@app.route('/storage/<student>', methods=['POST'])
def input_data(student):
    # Extract the json data
    data = request.get_json()
    # insert result.. student field allows our group to share database and keep our data separate
    result = items.insert_one({
        "student": student,
        "data": data
    })
    # response to the client, includes generated item id after item creation in database
    response = {
        "student": student,
        "itemId": str(result.inserted_id),
        "data": data
    }
    return jsonify(response), 201


# This route gets all data for a student
@app.route('/storage/<student>', methods=['GET'])
def get_all_data(student):
    # Find all data for this student:
    results = items.find({"student": student})
    # build the response of all data to send back to client
    output = []
    for r in results:
        output.append({
            "itemId": str(r["_id"]),
            "data": r["data"]
        })
    return jsonify(output), 200


# This route gets data for a single item, given student and item_id
@app.route('/storage/<student>/<item_id>', methods=['GET'])
def get_data(student, item_id):
    # set the item_id string to an object to search the object id in database
    object_id = ObjectId(item_id)
    # retrieve the record
    result = items.find_one({"_id": object_id, "student": student})
    # set what will be responded to client
    output = ({
        "itemId": item_id,
        "data": result["data"]
    })
    return jsonify(output), 200


# This route deletes a single item, given a student and item_id
@app.route('/storage/<student>/<item_id>', methods=['DELETE'])
def delete_data(student, item_id):
    # set the item_id string to an object to search the object id in database
    object_id = ObjectId(item_id)
    # delete the record
    result = items.delete_one({"_id": object_id, "student": student})
    return ('', 200)


# run program
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=True)