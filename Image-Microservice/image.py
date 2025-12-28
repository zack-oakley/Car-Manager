from flask import Flask, request, send_file
import mimetypes
import os

app = Flask(__name__)

# This route gets an image based on a given image_id. The image exists
#     in image/{image_id}/picture.png 
@app.route("/images/<image_id>", methods=["GET"])
def get_image(image_id):

    # path to folder with image
    folder = f"images/{image_id}"

    # files is a list of everyting in folder (just the image)
    files = os.listdir(folder)


    # set picture as the image, assume 1 picture per folder
    picture = files[0]

    # build path to the image
    path = os.path.join(folder, picture)

    # return the image file, has to be a PNG
    return send_file(path, mimetype='image/x-png')


# This route stores an image based on a given image_id. The function will
#     create a subfolder within images and name the folder the image_Id
#     
@app.route("/images/<image_id>", methods=["POST"])
def post_image(image_id):

    # make the filepath of where the new folder will go
    folder= f"images/{image_id}"

    # Make the folder for where the PNG image will go
    os.mkdir(folder)
   

    # set file equal to the sent over picture
    file = request.files["file"]

    # grab the filename from the picture
    filename = file.filename

    # set the new full path of 
    path = os.path.join(folder, filename)

    # save the picture to the created folder
    file.save(path)

    return "Image uploaded successfully", 201

# This route will delete an image based on an image_id. The function will
#     first delete the file out of its sub folder, then delete the subfolder
#     entirely
@app.route("/images/<image_id>", methods=["DELETE"])
def delete_image(image_id):
    
    # path to folder with image
    folder = f"images/{image_id}"

    # files is a list of everyting in folder (just the image)
    files = os.listdir(folder)

    # set picture as the image, assume 1 picture per folder
    picture = files[0]

    # build path to the image
    path = os.path.join(folder, picture)

    # first remove file
    os.remove(path)

    # then remove folder
    os.rmdir(folder)

    return "Image deleted successfully"

# run program
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)