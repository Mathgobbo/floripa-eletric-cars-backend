const mongoose = require("mongoose");

const LockingSchema = mongoose.Schema(
  { vehicleId: mongoose.Types.ObjectId, customerId: mongoose.Types.ObjectId, status: String },
  {
    timestamps: true,
  }
);
const LockingModel = mongoose.model("Locking", LockingSchema);

module.exports = {
  LockingSchema,
  LockingModel,
};
