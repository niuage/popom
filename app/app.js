// var os = require('os');
var app = require('remote').require('app');
// var jetpack = require('fs-jetpack').cwd(app.getAppPath());

// window.env contains data from config/env_XXX.json file.
var envName = window.env.name;

alert(app.getAppPath() + "/../resources/Client.txt")

var follow = require('text-file-follower');

var follower = follow(app.getAppPath() + "/../resources/Client.txt");

follower.on('line', function(filename, line) {
  console.log('Got a new line from '+filename+': '+line);
});

app.on('window-all-closed', function () {
   follower.close();
});

// ... and then eventually:
// follower.close();

// var rl = require('readline').createInterface({
//   input: require('fs').createReadStream(app.getAppPath() + "/../resources/Client.txt")
// });

// rl.on('line', function (line) {
//   console.log('Line from file:', line);
// });

// var readLines = function() {
//   console.log("mouhahah");

//   setTimeout(readLines, 1000)
// };

// readLines();
