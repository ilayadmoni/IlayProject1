
import pymongo
import gridfs
from bson import ObjectId


class DB_Mongo:
    # Static variables for database name, collection name, and Uri
    DBName = "RecipeWebsite"
    CollectionName = "Recipe"
    Uri = "mongodb://localhost:27017/"  # Adjust this URI as needed for your MongoDB instance
    

    def __init__(self):
        self.client = pymongo.MongoClient(self.Uri)
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
        
        
Mongo = DB_Mongo()
a= Mongo.get_all_recipe_from_db()        
print(a)
        
