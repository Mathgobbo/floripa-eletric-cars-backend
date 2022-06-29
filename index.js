const httpProxy = require("express-http-proxy");
const express = require("express");
const app = express();
var logger = require("morgan");

app.use(logger("dev"));

function selectProxyHost(req) {
  if (req.path.startsWith("/customer")) return "http://localhost:8081/";
  else if (req.path.startsWith("/vehicle")) return "http://localhost:8085/";
  else if (req.path.startsWith("/vehicle-localization")) return "http://localhost:8082/";
  else if (req.path.startsWith("/vehicle-locking")) return "http://localhost:8084/";
  else if (req.path.startsWith("/vehicle-reservation")) return "http://localhost:8083/";
}

app.use((req, res, next) => {
  httpProxy(selectProxyHost(req))(req, res, next);
});

app.listen(8000, () => {
  console.log("API Gateway iniciado!");
});
