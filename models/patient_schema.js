const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create patient schema
const patientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Patient = mongoose.model("Patients", patientSchema);
