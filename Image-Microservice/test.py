import requests
import os


# This test will use the get route with image_Id 68faf55b66e7685d4e5a7ab and will store
#     the returned image into TestOutputs/TestGet
def test_get():

    # local url, make sure image.py is running on Port 8080. after images/ hardcode the
    #     image_Id you want
    url = 'http://127.0.0.1:8080/images/68faf55b66e7685d4e5a7ab'

    # make a get request. reponse is now the image file
    response = requests.get(url)

    # make a directory, if it already exists ignore
    os.makedirs("TestGet", exist_ok=True)

    # Write the binary image content reterievd from image_id 68faf55b66e7685d4e5a7ab into test_image.png
    #     and save it in TestGet directory
    with open("TestGet/test_image.png", "wb") as f:
        f.write(response.content)
    
    return "";

# This function will craete a older "TestPost" in the images folder, and that will represent its
#     image_Id. Inside the folder, the image test_image.png will be put inside (which is in the TestGet folder)
def test_post():

    # Local url, the image is going to be put into a folder with an image_id of "TestPost"
    url = 'http://127.0.0.1:8080/images/TestPost'

    # Opens and reads the test_image.png file from TestGet and send the file to the post route
    with open("TestGet/test_image.png", "rb") as f:
        files = {"file": f}
        response = requests.post(url, files=files)


# This function will delete the TestPost folder out of the images folder. Effectivley removing
#     the image from storage
def test_delete():
    url = 'http://127.0.0.1:8080/images/TestPost'
    response = requests.delete(url)



if __name__ == "__main__":
    test_get()
    #test_post()
    #test_delete()