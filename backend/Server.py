from functools import wraps
from flask_cors import CORS, cross_origin
from flask import Flask, request, Response, jsonify,send_file
from flask_socketio import SocketIO
import io
import os
from MongoDB import DB_Mongo

# This Flask app is configured to serve both the React frontend (from the build folder)
# and provide API endpoints for the client. All static files and SPA routes are handled here.
StaticFolder = os.environ.get("STATIC_FOLDER", "../frontend/build")
app = Flask(__name__, static_folder=StaticFolder, static_url_path="/")
CORS(app, origins=['*'])  # Allow all origins
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
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    return app.send_static_file(path)

#Get api for giving list with all recipes details
@app.route('/api/recipes', methods=['GET'])
@handle_cors
@cross_origin(supports_credentials=True)
def getRecipes():
    try:
        return Mongo.get_all_recipe_from_db()
        
    except Exception as e:
        return {"error": str(e)}, 500


#Get api for posting image in client page from MongoDb
@app.route('/api/image/<ImageId>', methods=['GET'])
@handle_cors
@cross_origin(supports_credentials=True)
def getImage(ImageId):
    try:
        #Get image from MongoDB base on image id
        file = Mongo.get_image_from_db(ImageId)
        if not file:
            return {"error": "Image not found"}, 404
        
        #Post the image through API 
        return send_file(
            io.BytesIO(file.read()),   
            mimetype=file.content_type,  
            download_name=file.filename  
        )
    except Exception as e:
        return {"error": str(e)}, 500

#Collection data from Client and post on MongoDB
@app.route('/postrecipe', methods=['POST', 'OPTIONS'])
@handle_cors
@cross_origin(supports_credentials=True)
def handle_RecipePost():
    if request.method == 'POST':
        
        #Collection data from Client
        RecipeDetails = [request.form.get('RecipeName'),
                         request.form.get('FoodSupplies'),
                         request.form.get('OrderRecipe'),
                         request.form.get('RecipeMode'),
                         request.form.get('UserId'),
                         request.form.get('RecipeDescription')]
        ImageFile = request.files.get('image') 
        
        #Adding Recipe to MongoDB
        Mongo.add_recipe_to_db(RecipeDetails , ImageFile)
        
        # Return success JSON
        return jsonify({'message': 'Image received successfully', 'filename': ImageFile.filename})
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

#Delete recipe from Client and post on MongoDB
@app.route('/deleterecipe', methods=['POST', 'OPTIONS'])
@handle_cors
@cross_origin(supports_credentials=True)
def handle_DeleteRecipe():
    if request.method == 'POST':
        recipe_id = request.json['recipe_id']
        print(f"Delete the recipe_id: {recipe_id}")
        Mongo.delete_recipe_from_db(recipe_id)
        # Return success JSON
        return jsonify({'message': 'Image received successfully'})
    elif request.method == 'OPTIONS':
       # Respond to the preflight request
       response = app.response_class(
            response='',
            status=200,
            headers={
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
         )
    return response
    
#Collection data from Client and edit recipe on MongoDB
@app.route('/editrecipe', methods=['POST', 'OPTIONS'])
@handle_cors
@cross_origin(supports_credentials=True)
def handle_Recipeedit():
    if request.method == 'POST':
        #Collection data from Client
        RecipeDetails = [request.form.get('_id'),
                         request.form.get('RecipeName'),
                         request.form.get('FoodSupplies'),
                         request.form.get('OrderRecipe'),
                         request.form.get('RecipeMode')
                         ]
        
        ImageFile = request.files.get('image') 
        Mongo.edit_recipe_to_db(RecipeDetails , ImageFile)
        return jsonify({'message': 'Image received successfully'})
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


@app.route('/api/recipes/private/<UserId>', methods=['GET'])
@handle_cors
@cross_origin(supports_credentials=True)
def getRecipesbyUserId(UserId):
    try:
        return Mongo.get_recipes_by_userid(UserId)
    except Exception as e:
        return {"error": str(e)}, 500
    
#Get api for giving list with all recipes details
@app.route('/api/recipes/public', methods=['GET'])
@handle_cors
@cross_origin(supports_credentials=True)
def getRecipesPublic():
    try:
        return Mongo.get_recipes_public()
        
    except Exception as e:
        return {"error": str(e)}, 500
    
    
        
Mongo.create_RecipeDB_if_not_exists()
if __name__ == '__main__':
   
    app.run(host="0.0.0.0", port=80, debug=True)