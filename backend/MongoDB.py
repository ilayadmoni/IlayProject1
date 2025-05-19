
import pymongo
import gridfs
from bson import ObjectId


class DB_Mongo:
    # Static variables for database name, collection name, and Uri
    DBName = "ReciepeWebsite"
    CollectionName = "Reciepe"
    Uri = "mongodb://localhost:27017/"
    

    def __init__(self):
        self.client = pymongo.MongoClient(self.Uri)
        self.db = self.client[self.DBName]
        self.fs = gridfs.GridFS(self.db ,collection="image_collection")
        self.ReciepeCollection = self.db[self.CollectionName]
        

    #Function which create db and collection if not exist 
    def create_ReciepeDB_if_not_exists(self):
        db_list = self.client.list_database_names()
        if self.DBName not in db_list:
            ReciepeDB = self.db
            ReciepeCollection = ReciepeDB[self.CollectionName]
            # Create collection by inserting a placeholder document then deleting it
            ReciepeCollection.insert_one({"_init": True})
            ReciepeCollection.delete_many({"_init": True})
            print("Creating ReciepeWebsite DB successfully")
        else:
            # Optional: make sure "reciepe" collection exists
            ReciepeDB = self.client[self.DBName]
            if self.CollectionName not in ReciepeDB.list_collection_names():
                ReciepeDB.create_collection(self.CollectionName)
                print("Creating Reciepe collection successfully")
            else:
                print("The DB and the Collection Reciepe are already existed")    
        
       
    #Function for display the image through API
    def get_image_from_db(self, ImageId):
        try:
            file = self.fs.get(ObjectId(ImageId))
            return file
        except Exception as e:
            print(f"Error retrieving image from DB: {e}")
            return None
        
    #Function for collection the data from client and store in the MongoDB
    def add_reciepe_to_db(self, ReciepeDetails, ImageFile): 
        
        FileId = self.fs.put(
            ImageFile, 
            filename=ImageFile.filename,
            content_type=ImageFile.content_type
        )
        MetadataReciepe = {
            'ReciepeName': ReciepeDetails[0],
            'FoodSupplies': ReciepeDetails[1],
            'OrderReciepe': ReciepeDetails[2],
            'ImageId': FileId  
        }
        ResultReciepe = self.ReciepeCollection.insert_one(MetadataReciepe)
        
    #Function which return list with all the reciepe details
    def get_all_recipe_from_db(self):
        
        ReciepeList = list(self.ReciepeCollection.find())
        for item in ReciepeList:
            item['_id'] = str(item['_id']) 
            item['ImageId'] = str(item['ImageId'])
        return ReciepeList
        
        
Mongo = DB_Mongo()
a= Mongo.get_all_recipe_from_db()        
print(a)
        
