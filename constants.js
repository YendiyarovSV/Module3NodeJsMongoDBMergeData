const utils = require('./utils.js')


const jsonfolderName = 'data';
// Connection URL
const url = 'mongodb://localhost:27017';
const customerDataPath = utils.getFilePath(jsonfolderName, 'm3-customer-data', '.json');
const customerAddressDataPath = utils.getFilePath(jsonfolderName, 'm3-customer-address-data', '.json');
// Database Name
const dbName = 'CustomerDb'
const customerDataCollectionName = "customerData";
const customerAddressDataCollectionName = "customerAddressData";
const mergedCollectionName = "mergedDataCollection";

//read data from files
let customerData = utils.readJsonObjectsFromFileSync(customerDataPath)
let customerAddressData = utils.readJsonObjectsFromFileSync(customerAddressDataPath)
//set processing batch size
let batchSize = utils.getNumberOfThreadsFromCommandLine(10);
//setup iteration and dataSize for
const dataSize = customerData.length;



module.exports = {
  jsonfolderName:jsonfolderName,
  url:url,
  customerDataPath:customerDataPath,
  customerAddressDataPath:customerAddressDataPath,
  dbName:dbName,
  customerDataCollectionName:customerDataCollectionName,
  customerAddressDataCollectionName:customerAddressDataCollectionName,
  customerData:customerData,
  customerAddressData:customerAddressData,
  batchSize:batchSize,
  dataSize:dataSize,
  mergedCollectionName:mergedCollectionName
}
