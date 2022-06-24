require('dotenv').config()
const express = require("express")
const app = express();
const mongoose = require('mongoose');
const { VehicleReservationModel } = require('./models');
mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.ovale.mongodb.net/?retryWrites=true&w=majority`);

app.use(express.json())

const hoursNotation = 36e5 // 1000 * 60 * 60

app.post("/vehicle-reservation", async (request, response) => {
  const {vehicleId, from, to} = request.body
  let fromDate = Date.parse(from)
  let toDate = Date.parse(to)
  if(isNaN(fromDate)) return response.status(422).send("'from' não é uma data válida")
  if(isNaN(toDate)) return response.status(422).send("'to' não é uma data válida")
  if(toDate < fromDate) return response.status(400).send("'to' é menor do que 'from'")
  
  const hours = Math.abs(toDate - fromDate) / hoursNotation ;
  if(hours > 6) return response.status(400).send("Não é possível reservar por mais de 6 horas");
  if(hours < 2) return response.status(400).send("Não é possível reservar por menos de 2 horas");

  try {
    // Verify vehicle exists
  } catch (error) {
    return response.status(500).send("Veículo não existente")
  }

  const newReservation = await VehicleReservationModel.create({vehicleId, from, to})
  return response.send(newReservation)
})

app.get("/vehicle-reservation", async (request, response) => {
  const reservations = await VehicleReservationModel.find()
  response.send(reservations)
})

app.get("/vehicle-reservation/:id", async (request, response) => {
  const reservations = await VehicleReservationModel.findById(request.params.id)
  response.send(reservations)
})



app.listen(8083, ()=> {
  console.log("Listening at 8083")
})