const SERVER = "http://54.91.87.82:3000";
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
  request.post(
    SERVER,
    {
      json: {
        key:
          '{"x": ' +
          force.getitem(0).toFixed(2) +
          ', "y": ' +
          force.getitem(1).toFixed(2) +
          ', "z": ' +
          force.getitem(2).toFixed(2) +
          "}",
      },
    },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log("SUCCESS");
      }
    }
  );
}

myLoop();
