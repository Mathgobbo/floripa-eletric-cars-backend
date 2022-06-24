

const mongoose = require('mongoose');

const VehicleLocalizationSchema = mongoose.Schema({ vehicleId: mongoose.Types.ObjectId, coordinates: [Number], dateTime: Date });
const VehicleLocalizationModel = mongoose.model('VehicleLocalization', VehicleLocalizationSchema)

module.exports = {
  VehicleLocalizationSchema,
  VehicleLocalizationModel
}