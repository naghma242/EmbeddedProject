const SERVER = "http://34.224.165.127:3000";
var upm = require("jsupm_adxl345");
var adxl = new upm.Adxl345(0);
var request = require("request");

function myLoop() {
  while (true) {
    setTimeout(function () {
      updateServer();
    }, 3000);
  }
}

function updateServer() {
  adxl.update();
  var force = adxl.getAcceleration();
  json = {
    key:
      '{"x": ' +
      force.getitem(0).toFixed(2) +
      ', "y": ' +
      force.getitem(1).toFixed(2) +
      ', "z": ' +
      force.getitem(2).toFixed(2) +
      "}",
  };
  request.post(SERVER, (data = json), function (error, response, body) {
    console.log("Uploaded.");
    if (!error && response.statusCode == 200) {
      console.log("SUCCESS");
    }
  });
}

myLoop();
