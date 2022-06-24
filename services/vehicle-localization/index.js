require('dotenv').config()
const express = require("express")
const app = express();
const mongoose = require('mongoose');
const { VehicleLocalizationModel } = require('./models');
mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.ovale.mongodb.net/?retryWrites=true&w=majority`);

app.use(express.json())

app.post("/vehicle-localization", async (request, response) => {
  const {vehicleId, latitude, longitude} = request.body
  try {
    // Verify vehicle exists
  } catch (error) {
    response.status(500).send("Veículo não existente")
  }
  const newLoc = await VehicleLocalizationModel.create({vehicleId, coordinates: [longitude, latitude], dateTime: new Date()})
  response.send(newLoc)
})

app.get("/vehicle-localization", async (request, response) => {
  const localizations = await VehicleLocalizationModel.find()
  response.send(localizations)
})

app.listen(8082, ()=> {
  console.log("Listening at 8082")
})