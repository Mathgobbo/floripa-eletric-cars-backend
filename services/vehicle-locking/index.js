require("dotenv").config();
const { default: axios } = require("axios");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
mongoose.connect(
  `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.ovale.mongodb.net/?retryWrites=true&w=majority`
);
const { LockingModel } = require("./models");

app.post("/vehicle-unlock", async (request, response) => {
  try {
    const { vehicleId, userId } = request.body;
    if (!vehicleId) return response.status(400).send("'vehicleId' não enviado");
    if (!userId) return response.status(400).send("'userId' não enviado");

    try {
      // Verify vehicle exists
    } catch (error) {
      return response.status(500).send("Veículo não existente");
    }

    let user = null;
    try {
      user = await axios.get("http://localhost:8081/customer/" + userId);
      if (!user) throw "Usuário inexistente";
    } catch (error) {
      return response.status(500).send(error);
    }

    const lock = await LockingModel.create({ vehicleId, customerId: userId, status: "UNLOCKED" });
    return response.send(lock);
  } catch (error) {
    return response.status(500).send(error.message);
  }
});

app.post("/vehicle-lock", async (request, response) => {
  try {
    const { vehicleId, userId } = request.body;
    if (!vehicleId) return response.status(400).send("'vehicleId' não enviado");
    if (!userId) return response.status(400).send("'userId' não enviado");

    try {
      // Verify vehicle exists
    } catch (error) {
      return response.status(500).send("Veículo não existente");
    }

    let user = null;
    try {
      user = await axios.get("http://localhost:8081/customer/" + userId);
      if (!user) throw "Usuário inexistente";
    } catch (error) {
      return response.status(500).send(error);
    }

    const lock = await LockingModel.create({ vehicleId, customerId: userId, status: "LOCKED" });
    return response.send(lock);
  } catch (error) {
    return response.status(500).send(error.message);
  }
});

app.listen(8084, () => {
  console.log("Listening at 8084");
});
