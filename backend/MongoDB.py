import pymongo
import gridfs
from bson import ObjectId
import os
from pymongo import MongoClient

class DB_Mongo:
    # Static variables for database name and collection name only
    DBName = "RecipeWebsite"
    CollectionName = "Recipe"
    CollectionNameUsers = 'UsersDetails'

    def __init__(self):
        # Read URI_MONGO from environment at instance creation time
        self.Uri = os.environ.get("URI_MONGO", "mongodb://localhost:27017/")
        if self.Uri.startswith("mongodb+srv://") or "ssl=true" in self.Uri or "tls=true" in self.Uri:
            self.client = MongoClient(self.Uri, tls=True, tlsAllowInvalidCertificates=True)
        else:
         self.client = MongoClient(self.Uri)
        self.db = self.client[self.DBName]
        self.fs = gridfs.GridFS(self.db ,collection="image_collection")
        self.RecipeCollection = self.db[self.CollectionName]
        self.UsersDetails = self.db[self.CollectionNameUsers]
        
# Function which creates DB and collections if not exist
    def create_RecipeDB_if_not_exists(self):
     db_list = self.client.list_database_names()

     if self.DBName not in db_list:
         RecipeDB = self.db

         # Create Recipe collection
         RecipeCollection = RecipeDB[self.CollectionName]
         RecipeCollection.insert_one({"_init": True})
         RecipeCollection.delete_many({"_init": True})
         print("Creating RecipeWebsite DB and Recipe collection successfully")

         # Create Users collection
         UsersCollection = RecipeDB[self.UsersDetails]
         UsersCollection.insert_one({"_init": True})
         UsersCollection.delete_many({"_init": True})
         print("Creating Users collection successfully")

     else:
         # If DB exists, check for each collection
         RecipeDB = self.client[self.DBName]

         if self.CollectionName not in RecipeDB.list_collection_names():
             RecipeDB.create_collection(self.CollectionName)
             print("Creating Recipe collection successfully")
         else:
             print("Recipe collection already exists")

         if "Users" not in RecipeDB.list_collection_names():
             RecipeDB.create_collection("Users")
             print("Creating Users collection successfully")
         else:
             print("Users collection already exists")
    
        
       
    #Function for display the image through API
    def get_image_from_db(self, ImageId):
        try:
            file = self.fs.get(ObjectId(ImageId))
            return file
        except Exception as e:
            print(f"Error retrieving image from DB: {e}")
            return None
        
    #Function for collection the data from client and store in the MongoDB
    def add_recipe_to_db(self, RecipeDetails, ImageFile): 
        
        FileId = self.fs.put(
            ImageFile, 
            filename=ImageFile.filename,
            content_type=ImageFile.content_type
        )
        MetadataRecipe = {
            'RecipeName': RecipeDetails[0],
            'FoodSupplies': RecipeDetails[1],
            'OrderRecipe': RecipeDetails[2],
            'RecipeMode': RecipeDetails[3],
            'UserId': RecipeDetails[4],
            'RecipeDescription': RecipeDetails[5],
            'ImageId': FileId  
        }
        ResultRecipe = self.RecipeCollection.insert_one(MetadataRecipe)
        
    #Function which return list with all the reciepe details
    def get_all_recipe_from_db(self):
        
        RecipeList = list(self.RecipeCollection.find())
        for item in RecipeList:
            item['_id'] = str(item['_id']) 
            item['ImageId'] = str(item['ImageId'])
        return RecipeList
    
    def delete_recipe_from_db(self, recipe_id):
        try:
            recipe = self.RecipeCollection.find_one({"_id": ObjectId(recipe_id)})
            if not recipe:
                return {"error": "Recipe not found"}, 404
            image_id = recipe['ImageId']
            print(f"Recipe found: {recipe}")
            recipe_name = recipe['RecipeName']
            try:
                self.fs.delete(ObjectId(image_id))
            except Exception as e:
                print(f"Error deleting image from GridFS: {e}")
            result = self.RecipeCollection.delete_one({"_id": ObjectId(recipe_id)})
            if result.deleted_count > 0:
                return {"message": f"Recipe '{recipe_name}' and its image have been deleted successfully."}
            else:
                return {"error": "Recipe not found after image delete"}, 404
        except Exception as e:
            return {"error": str(e)}, 500
        
        
        #Function for collection the data from client and store in the MongoDB
    def edit_recipe_to_db(self, RecipeDetails, ImageFile):
        recipe_id = RecipeDetails[0]
        # Find the existing recipe
        recipe = self.RecipeCollection.find_one({'_id': ObjectId(recipe_id)})
        if not recipe:
            return {'error': 'Recipe not found'}, 404

        update_fields = {
            'RecipeName': RecipeDetails[1],
            'FoodSupplies': RecipeDetails[2],
            'OrderRecipe': RecipeDetails[3],
            'RecipeMode': RecipeDetails[4],
            'RecipeDescription': RecipeDetails[5]
        }

        # Handle image update
        if ImageFile is not None and getattr(ImageFile, 'filename', '') != '':
            # Delete old image from GridFS
            old_image_id = recipe.get('ImageId')
            if old_image_id:
                try:
                    self.fs.delete(ObjectId(old_image_id))
                except Exception as e:
                    print(f"Error deleting old image from GridFS: {e}")
            # Upload new image
            FileId = self.fs.put(
                ImageFile,
                filename=ImageFile.filename,
                content_type=ImageFile.content_type
            )
            update_fields['ImageId'] = FileId
        # else: keep existing ImageId

        result = self.RecipeCollection.update_one(
            {'_id': ObjectId(recipe_id)},
            {'$set': update_fields}
        )
        if result.modified_count > 0:
            return {'message': 'Recipe updated successfully.'}
        else:
            return {'message': 'No changes made to the recipe.'}
    
    # Function to get all recipes for a specific user by UserId
    def get_recipes_by_userid(self, user_id):
        try:
            RecipeList = list(self.RecipeCollection.find({'UserId': user_id}))
            for item in RecipeList:
                item['_id'] = str(item['_id'])
                item['ImageId'] = str(item['ImageId'])
            return RecipeList
        except Exception as e:
            print(f"Error retrieving recipes for user {user_id}: {e}")
            return []

    # Function to get all recipes by Public RecipeMode 
    def get_recipes_public(self):
        try:
            RecipeList = list(self.RecipeCollection.find({'RecipeMode': "Public"}))
            for item in RecipeList:
                item['_id'] = str(item['_id'])
                item['ImageId'] = str(item['ImageId'])
            return RecipeList
        except Exception as e:
            print(f"Error retrieving recipes for mode {'public'}: {e}")
            return []
        
    # Function to add new user details to the UsersDetails collection 
    def add_new_user_detail(self,userdetail):
        try:  
            userdetail = {
                'UserUID': userdetail[0],
                'UserName': userdetail[1],
                'Email': userdetail[2],
                'PhotoUrl': userdetail[3]
            }
            usersUID = [user["UserUID"] for user in self.UsersDetails.find({}, {"UserUID": 1, "_id": 0})]
            if userdetail['UserUID'] not in usersUID:
                 ResultUser = self.UsersDetails.insert_one(userdetail)
            else:
                print("The user is recognized by the system ")
        
        except Exception as e:
            print(f"Error adding new user detail: {e}")
            
    #Function to get user details by UserUID
    def get_user_details_by_uid(self, user_uid):
        try:
            user = self.UsersDetails.find_one({'UserUID': user_uid})
            if user:
                user['_id'] = str(user['_id'])  # Convert ObjectId to string
                return user
            else:
                return None 
        except Exception as e:
            print(f"Error retrieving user details by uid: {e}")
            return None
        
        
Mongo = DB_Mongo()
userdetail_list = [
    '1234115',                   # UserUID
    'John Doe',                # UserName
    'john.doe@example.com',    # Email
    'https://example.com/photo.jpg'  # PhotoUrl
]


