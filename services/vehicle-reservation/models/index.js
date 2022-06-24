

const mongoose = require('mongoose');

const VehicleReservationSchema = mongoose.Schema({ vehicleId: mongoose.Types.ObjectId, customerId: mongoose.Types.ObjectId, from: Date, to: Date });
const VehicleReservationModel = mongoose.model('VehicleReservation', VehicleReservationSchema)

module.exports = {
  VehicleReservationSchema,
  VehicleReservationModel
}