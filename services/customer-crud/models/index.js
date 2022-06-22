const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({ id: mongoose.Types.ObjectId, name: String, CPF: String, CNH: String, email: String, phone: String,  cardNumber: String });
const CustomerModel = mongoose.model('Customer', CustomerSchema)

module.exports = {
  CustomerSchema,
  CustomerModel
}