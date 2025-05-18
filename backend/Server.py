from functools import wraps
from flask_cors import CORS, cross_origin
from flask import Flask, request, Response, jsonify,send_file
from flask_socketio import SocketIO
import os
import io
from werkzeug.utils import secure_filename
from MongoDB import DB_Mongo

app = Flask(__name__, static_folder="./frontend/dist")
CORS(app,origins=['http://0.0.0.0', 'http://localhost'])
socketio = SocketIO(app)
Mongo = DB_Mongo()



       
def add_cors_preflight_headers(response):
    response.headers['Access-Control-Allow-Origin'] = "*"  
    response.headers['Access-Control-Allow-Methods'] = "POST, OPTIONS"
    response.headers['Access-Control-Allow-Headers'] = "Content-Type,Authorization"
    return response


def handle_cors(func):
    @wraps(func)
    def decorator(*args, **kwargs):
        if request.method == 'OPTIONS':
            # Respond with CORS headers for preflight request
            response = Response()
            response = add_cors_preflight_headers(response)
            return response
        else:
            # For other requests, let the actual endpoint handle it
            response = func(*args, **kwargs)
            response = add_cors_preflight_headers(response)
            return response
    return decorator

@app.errorhandler(404)
@handle_cors
@cross_origin(supports_credentials=True)
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/')
@handle_cors
@cross_origin(supports_credentials=True)
def index():
    return app.send_static_file("index.html")

@app.route('/<path:path>', methods=['GET'])
@handle_cors
@cross_origin(supports_credentials=True)
def static_proxy(path):
    return app.send_static_file(path)



@app.route('/api/image/<image_id>', methods=['GET'])
@handle_cors
@cross_origin(supports_credentials=True)
def get_image(image_id):
    try:
        file = Mongo.get_image_from_db(image_id)
        if not file:
            return {"error": "Image not found"}, 404

        return send_file(
            io.BytesIO(file.read()),   # stream file data
            mimetype=file.content_type,  # e.g. "image/png"
            download_name=file.filename  # suggested filename for download
        )
    except Exception as e:
        return {"error": str(e)}, 500



    
@app.route('/api/reciepestest', methods=['POST', 'OPTIONS'])
@handle_cors
@cross_origin(supports_credentials=True)
def handle_reciepestest():
    
    if request.method == 'POST':
        data =request.json 
        print("the data recieve:")
        print(data['reciepeName'])        
        return jsonify({'message': 'Data received successfully'})
    elif request.method == 'OPTIONS':
        print("hhh")
        # Respond to the preflight request
        response = app.response_class(
            response='',
            status=200,
            headers={
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        )
        return response   
    
    #post of image from front to db
@app.route('/api/reciepestestpicture', methods=['POST', 'OPTIONS'])
@handle_cors
@cross_origin(supports_credentials=True)
def handle_reciepestest1():
    if request.method == 'POST':
        print(request.files)
        image_file = request.files.get('image') 
        print(type(image_file))
        Mongo.add_image_to_db(image_file)
        # Return success JSON
        return jsonify({'message': 'Image received successfully', 'filename': image_file.filename})
    elif request.method == 'OPTIONS':
        # Respond to the preflight request
       response = app.response_class(
    response='',
    status=200,
    headers={
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    }
 )
    return response  
    

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3000, debug=True)