const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;
// Create patient schema
const patientSchema = new Schema({
  profilePic: {
    data: Buffer,
    contentType: String
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

patientSchema.plugin(passportLocalMongoose);
module.exports = Patient = mongoose.model("Patients", patientSchema);
