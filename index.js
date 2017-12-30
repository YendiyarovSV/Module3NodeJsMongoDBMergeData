const MongoClient = require('mongodb').MongoClient;
const utils = require('./utils.js')
const mongo = require('./mongoOperations.js')
const consts = require('./constants.js')
const migration = require('./migration.js')
console.log(`Selected batch size ${consts.batchSize}`);

//save data to mongodb
MongoClient.connect(consts.url, function(err, client) {
  if (err) return process.exit(1)
  console.log("Connected successfully to server");
  const db = client.db(consts.dbName);
  mongo.removeAllDocumentsFromCollection(db, consts.mergedCollectionName, () => {
    mongo.removeAllDocumentsFromCollection(db, consts.customerDataCollectionName, () => {
      mongo.removeAllDocumentsFromCollection(db, consts.customerAddressDataCollectionName, () => {
        mongo.populateMongoDbFromJson(db, consts.customerDataCollectionName, consts.customerData, () => {
          mongo.populateMongoDbFromJson(db, consts.customerAddressDataCollectionName, consts.customerAddressData, () => {
            migration.migrateData(db, 0, () => {
              client.close();
            });

          })
        })
      })
    })
  })


});
