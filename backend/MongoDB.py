import pymongo
import gridfs
from bson import ObjectId
import os
from pymongo import MongoClient

class DB_Mongo:
    # Static variables for database name and collection name only
    DBName = "RecipeWebsite"
    CollectionName = "Recipe"

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
        

    #Function which create db and collection if not exist 
    def create_RecipeDB_if_not_exists(self):
        db_list = self.client.list_database_names()
        if self.DBName not in db_list:
            RecipeDB = self.db
            RecipeCollection = RecipeDB[self.CollectionName]
            # Create collection by inserting a placeholder document then deleting it
            RecipeCollection.insert_one({"_init": True})
            RecipeCollection.delete_many({"_init": True})
            print("Creating RecipeWebsite DB successfully")
        else:
            # Optional: make sure "reciepe" collection exists
            RecipeDB = self.client[self.DBName]
            if self.CollectionName not in RecipeDB.list_collection_names():
                RecipeDB.create_collection(self.CollectionName)
                print("Creating Recipe collection successfully")
            else:
                print("The DB and the Collection Recipe are already existed")    
        
       
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

Mongo = DB_Mongo()
a= Mongo.get_recipes_public()
print(a)
