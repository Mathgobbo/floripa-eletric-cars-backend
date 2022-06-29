const mongoose = require('mongoose');

const VehicleSchema = mongoose.Schema({ id: mongoose.Types.ObjectId, placa: String, ano: String, modelo: String, valor: String});
const VehicleModel = mongoose.model('Vehicle', VehicleSchema)

module.exports = {
    VehicleSchema,
    VehicleModel
}
