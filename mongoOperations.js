const consts = require('./constants.js')
exports.removeAllDocumentsFromCollection = function(db, collectionName, callback) {
  // Get the documents collection
  const collection = db.collection(collectionName);
  // Delete document where a is 3
  collection.deleteMany({}, function(err, result) {
    console.log(`Removed all documents from ${collectionName}`);
    callback(result);
  });
}

//copy json to Collection
exports.populateMongoDbFromJson = function(db,collectionName, data,callback) {
  // Get the documents collection
  const collection = db.collection(collectionName);
  //make key in order to unite elements of collections
  for(let i=0;i<=data.length-1;i++){
    data[i].index = i;
  }
  // Insert some documents
  collection.insertMany(data, function(err, result) {
    console.log("Populated all collection data!");
    callback(result);
  });
}

exports.mergeData = function(db,srcObject,addObject,callback){
  //store old mongo id
  srcObject._oldCustomerMongoId = srcObject._id;
  srcObject._oldCustomerInfoMongoId = addObject._id;
  var mergedObject = Object.assign(srcObject,addObject);
  //delete object mongo _id it will be recreated
  delete mergedObject._id
  // Get the documents collection
  const collection = db.collection(consts.mergedCollectionName);
  // Update merged document
  collection.insert(mergedObject, (error, results) => {
    if (error) console.log(error);
    callback();
  })

}

exports.findDataElementByIndex = function(db,collectionName, index, callback) {
  // Get the documents collection
  const collection = db.collection(collectionName);
  collection.findOne({'index':index}, function(err, document) {
     callback(document);
  });
}
