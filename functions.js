var request = require("request")
var fs = require("fs")

var createAuthenticationObj = function (url, owner, repo){
  var requestData = {
    url:`${url}/repos/${owner}/${repo}/contributors`,
    auth: {bearer: `${token}`},
    headers: {'User-Agent': 'request'}
    }
  return requestData
};

var downloadImageByURL = function (url, path, callback) {
  fs.access(path, fs.F_OK, (err) => { // ask how to read documentation re: fs.constants.F_OK
    if (err){
    console.log(err ? 'There is no folder to put your pictures!' : 'can read/write')
    throw err
    } else {
    request(url)
    .pipe(fs.createWriteStream(path))
    .on('close', function() {callback("download complete")});
    }
  })
}

var manyPrints = function (err, urls){ //urls is an array of urls
  if (err) {
    throw err;
  }
  for (imageUrl of urls){
    var idarr = imageUrl.match(/\d{2,}/)
    var id = idarr[0]
    downloadImageByURL(imageUrl, `./pictures/${id}.png`, console.log)
  }
}





module.exports = {
  auth: createAuthenticationObj,
  downloadimg: downloadImageByURL,
  manyPrints: manyPrints
}
