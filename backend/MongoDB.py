
import pymongo
import gridfs


class DB_Mongo:
    # Static variables for database name, collection name, and URI
    db_name = "ReciepeWebsite"
    collection_name = "Reciepe"
    uri = "mongodb://localhost:27017/"

    def __init__(self):
        self.client = pymongo.MongoClient(self.uri)
        self.db = self.client[self.db_name]
        self.fs = gridfs.GridFS(self.db)
        self.reciepe_collection = self.db[self.collection_name]
        

    #function which create db and collection if not exist 
    def create_reciepe_db_if_not_exists(self):
        db_list = self.client.list_database_names()
        if self.db_name not in db_list:
            reciepe_db = self.db
            reciepe_collection = reciepe_db[self.collection_name]
            # Create collection by inserting a placeholder document then deleting it
            reciepe_collection.insert_one({"_init": True})
            reciepe_collection.delete_many({"_init": True})
            print("Creating ReciepeWebsite DB successfully")
        else:
            # Optional: make sure "reciepe" collection exists
            reciepe_db = self.client[self.db_name]
            if self.collection_name not in reciepe_db.list_collection_names():
                reciepe_db.create_collection(self.collection_name)
                print("Creating Reciepe collection successfully")
            else:
                print("The DB and the Collection Reciepe are already existed")    
        


    def add_reciepe_with_file(self, reciepeObject, file_storage):
 
        if file_storage:
            image_id = self.fs.put(file_storage, filename=file_storage.filename, content_type=file_storage.content_type)
            reciepeObject["PictureOfReciepe"] = {
                "filename": file_storage.filename,
                "content_type": file_storage.content_type,
                "gridfs_id": image_id
            }
        else:
            reciepeObject["PictureOfReciepe"] = None
            
            
        print(reciepeObject)

        result = self.reciepe_collection.insert_one(reciepeObject)
        return str(result.inserted_id)
        
            
 
#test = DB_Mongo()
#test.create_reciepe_db_if_not_exists()
#test.create_reciepe_db_if_not_exists()
#object = {"name": "fffff" , "age": "24"}
#object1 = {
#    "ReciepeName": "חביתה",
#    "FoodSupplies": "2 ביצים\nמלח \nפלפל",
#    "OrderReciepe": "לוקחים את 2 הביצים מטגנים אותם על מחבט ומוסיפים מלח ופלפל",
#    "PictureOfReciepe": {}
#}
#