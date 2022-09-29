const SERVER = "http://34.224.165.127:3000";
var upm = require("jsupm_adxl345");
var adxl = new upm.Adxl345(0);
const axios = require("axios");

function Main(delay) {
  console.log("Here 1");

  setInterval(() => {
    updateServer();
  }, delay);
}

Main(3000);

function updateServer() {
  console.log("Here 3");

  adxl.update();
  var force = adxl.getAcceleration();
  console.log("Here 4");
  var json = {
    key:
      '{"x": ' +
      force.getitem(0).toFixed(2) +
      ', "y": ' +
      force.getitem(1).toFixed(2) +
      ', "z": ' +
      force.getitem(2).toFixed(2) +
      "}",
  };
  axios.post(SERVER, json, function (error, response, body) {
    console.log("Uploaded.");
    if (!error && response.statusCode == 200) {
      console.log("SUCCESS");
    }
  });
}
