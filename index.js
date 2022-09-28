const express = require("express");
const app = express();
const port = 3000;
let data;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/", function (req, res) {
  console.log(req.body);
  data = JSON.parse(req.body);
});

app.get("/", function (req, res) {
  res.sendFile("graph.html", { root: __dirname });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

var ws = require("websocket").server;
var http = require("http");

var server = http.createServer();
server.listen(3001, function () {
  console.log("WebSocket listening on port 3001\n");
});

// Create the server
wss = new ws({
  httpServer: server,
});

wss.on(
  "request",
  function (request) {
    var connection = request.accept(null, request.origin);
    connection.send(data);
  },
  100
); // Send the data every 100 ms

// If client sends something back
connection.on("message", function (message) {
  if (message.type === "utf8") {
    // Process WebSocket message
    console.log(
      "Message from " + request.remoteAddress + " : " + message.data + "\n"
    );
  }
});

connection.on("close", function (connection) {
  // Close remote connection
  console.log("Connection from " + request.remoteAddress + " closed\n");
  clearInterval(gatherData);
});
