var request = require('request');
var fs = require('fs');
var token = require('./secrets').GITHUB_TOKEN;

console.log('Welcome to the Github Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'Token '+token
  }
};

  request(options, function(err, res, body) {
    var parsedBody = JSON.parse(body);
    cb(err, parsedBody);

    for (var i =0; i < parsedBody.length; i++) {
      var avatarUrl = parsedBody[i].avatar_url;
      var login = parsedBody[i].login;
      console.log("Avatar: " + avatarUrl);
      console.log("Login: " + login);
      downloadImageByURL(avatarUrl, "avatars/" + login +  ".jpg")
      // console.log(parsedBody[i].avatar_url); //iterates through parsed body(array of objects)
                                            //and pushes it to the index
    }
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)

  .on('error', function (err) {
    throw err;
  })

  .pipe(fs.createWriteStream(filePath));

}

getRepoContributors("jquery", "jquery", function(err, result) {
  // console.log("Errors:", err);
  // console.log("Result:", result);

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")
});