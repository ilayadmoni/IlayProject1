from functools import wraps
from flask_cors import CORS, cross_origin
from flask import Flask, request, Response, jsonify
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO
import os
from werkzeug.utils import secure_filename
from MongoDB import DB_Mongo

app = Flask(__name__, static_folder="./frontend/dist")
CORS(app,origins=['http://0.0.0.0', 'http://localhost'])
socketio = SocketIO(app)
Mongo = DB_Mongo()



       
def add_cors_preflight_headers(response):
    response.headers['Access-Control-Allow-Origin'] = "*"
    response.headers['Access-Control-Allow-Methods'] = "POST"  # Allow POST requests
    response.headers['Access-Control-Allow-Headers'] = "Content-Type"  # Allow Content-Type header
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
    

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3000, debug=True)