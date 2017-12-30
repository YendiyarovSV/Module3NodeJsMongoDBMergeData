const fs = require('fs')
const path = require('path')
module.exports = (function() {

  var getNumberOfThreadsFromCommandLine =  function(defaultNumber){
    if(process.argv.length <= 2)
        return defaultNumber;
    return parseInt(process.argv[2]);
  }
  var getFilePath = function(folderName,fileName, fileExtension){
      return path.join(__dirname, folderName, fileName+fileExtension);
  }
  var readJsonObjectsFromFileSync = function(jsonFilePath){
    var data = fs.readFileSync(jsonFilePath, {encoding: 'utf-8'});
    return JSON.parse(data);
  }
  return  {
    getNumberOfThreadsFromCommandLine:getNumberOfThreadsFromCommandLine,
    getFilePath:getFilePath,
    readJsonObjectsFromFileSync:readJsonObjectsFromFileSync
  }
})();
