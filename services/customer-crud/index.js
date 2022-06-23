require('dotenv').config()
const express = require("express")
const app = express();
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.ovale.mongodb.net/?retryWrites=true&w=majority`);
const { CustomerModel } = require("./models");

app.use(express.json())

app.get("/customer", async (request, response) => {
  const customers = await CustomerModel.find()
  return response.send(customers)
})

app.get("/customer/:id", async (request, response) => {
  const {id} = request.params;
  const customer = await CustomerModel.findById(id)
  return response.send(customer)
})

app.post("/customer", async (request, response) => {
  const {body} = request
  const newCustomer = await CustomerModel.create(body)
  return response.send(newCustomer)
})

app.patch("/customer/:id", async (request, response)=> {
  const {body} = request
  const {id} = request.params;
  const updatedCustomer = await CustomerModel.updateOne({_id: id}, body)
  return response.send(updatedCustomer)
})

app.delete("/customer/:id", async (request, response)=> {
  const {id} = request.params;
  const deleted = await CustomerModel.deleteOne({_id: id})
  return response.send(deleted)
})

app.listen(8080, ()=> {
  console.log("Listening at 8080")
})