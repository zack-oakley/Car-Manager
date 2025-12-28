import requests
import os
import json

# This test will use the get route and return all records for zack
def test_get_all():
    url = 'http://127.0.0.1:8000/storage/zack'

    # make a get request
    response = requests.get(url)

    # parse json
    data = response.json()

    print(data)

    
    return "";

# This test will use the get route and return all records for zack
def test_get():
    url = 'http://127.0.0.1:8000/storage/zack/691924238139b9492aeb4db1'

    # make a get request
    response = requests.get(url)

    # parse json
    data = response.json()

    print(data)

    
    return "";

# This function will add a record to zacks database
def test_post():
    url = 'http://127.0.0.1:8000/storage/zack'

    data_for_test = {
        "Name": "Test Name",
        "Value": "Test Value",
        "Something": "Test of Something"
    }
    # makes a post request
    response = requests.post(url, json=data_for_test)
    data = response.json()
    print("New data added is:")
    print(data)

    return data['itemId'];




# This function will delete the TestPost folder out of the images folder. Effectivley removing
#     the image from storage
def test_delete(id):
    url = 'http://127.0.0.1:8000/storage/zack/' + id
    response = requests.delete(url)



if __name__ == "__main__":
    print("")
    print("TESTING GET ALL FOR ZACK:")
    test_get_all()
    print("")
    print("TESTING GET FOR ID 691924238139b9492aeb4db1:")
    
    test_get()
    print("")
    print("TESTING POST FOR ZACK")
    # setting id equal to the id of the created record to delete in later test
    id = test_post()  
    print("")
    print("NOW GET ALL TO SHOW ADDITION")
    test_get_all()
    print("")
    print("NOW TEST DELETE")
    test_delete(id)
    print("item delete, now run GET ALL AGAIN")
    test_get_all()