require('dotenv').config();
const { response, request } = require('express');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { CustomerModel } = require('../customer-crud/models');
mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.ovale.mongodb.net/?retryWrites=true&w=majority`);
const { VehicleModel } = require('./models')

app.use(express.json());

app.get("/vehicle", async (request, response) => {
    const vehicles = await VehicleModel.find()
    return response.send(vehicles)
})

app.get("/vehicle/:id", async (request, response) => {
    const {id} = request.params;
    const vehicle = await VehicleModel.findById(id);
    return response.send(vehicle)
})

app.post("/vehicle", async (request, response) => {
    const {body} = request
    const newVehicle = await CustomerModel.create(body)
    return response.send(newVehicle)
})

app.patch("/customer/:id", async (request, response) => {
    const {body} = request
    const {id} = request.params;
    const updatedVehicle = await CustomerModel.updateOne({_id: id}, body)
    return response.send(updatedCustomer)
})

app.delete("/customer/:id", async (request, response) => {
    const {id} = request.params;
    const deleted = await CustomerModel.deleteOne({_id: id})
    return response.send(deleted)
})

app.listen(8085, () => {
    console.log("Listening at port 8085")
})
