const consts = require('./constants.js')
const async = require('async')
const mongo = require('./mongoOperations.js')
const migration = require('./migration.js')

var buildTasks = function(db,processedElements){
  tasks = [];
  for (let i = processedElements; i <= processedElements + consts.batchSize-1; i++) {
    if (i >= consts.dataSize) {
      console.warn(`Processing end at ${i}`);
      break;
    }
    tasks.push(function(callbackFnc) {
      var itemIndex = i;
      mongo.findDataElementByIndex(db, consts.customerDataCollectionName, itemIndex, (srcObject) => {
        mongo.findDataElementByIndex(db, consts.customerAddressDataCollectionName, itemIndex, (addObject) => {
          mongo.mergeData(db, srcObject, addObject, () => {
            callbackFnc(null, itemIndex);
          });
        })
      })
    })
  }
  return tasks;
}

exports.migrateData = function(db, processedElements, callback) {
  //build tasks for a async proccessing
  let tasks = buildTasks(db,processedElements);
  async.parallel(tasks, (error, results) => {
    if (error) console.log(error);
    processedElements += results.length;
    console.log(`Processed elements ${processedElements} out of ${consts.dataSize}`);
    if (processedElements < consts.dataSize) {
      migration.migrateData(db, processedElements, callback);
    } else {
      callback();
    }
  })
}
