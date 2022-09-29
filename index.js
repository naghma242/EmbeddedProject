const express = require("express");
const app = express();
const port = 3000;
let data;
const bodyParser = require("body-parser");

const base = `${__dirname}/public`;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/", function (req, res) {
  console.log(req);
  //data = JSON.parse(req.data);
});

app.get("/", function (req, res) {
  res.sendFile(`${base}/graph.html`);
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
);
