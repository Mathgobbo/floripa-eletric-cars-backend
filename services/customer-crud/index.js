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

app.get("/customer/:id", (request, response) => {
  //GET CUSTOMER BY ID
})

app.post("/customer", async (request, response) => {
  const {body} = request
  const newCustomer = await CustomerModel.create(body)
  return response.send(newCustomer)
})

app.patch("/customer", (request, response)=> {
  //UPDATE CUSTOMER
})

app.delete("/customer/:id", (request, response)=> {
  //DELETE CUSTOMER
})

app.listen(8080, ()=> {
  console.log("Listening at 8080")
})