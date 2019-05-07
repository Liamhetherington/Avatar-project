var request = require('request');
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
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});