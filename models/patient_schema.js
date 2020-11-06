const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

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
  notifications: [{
    message: {
      type: String
    },
    seen: {
      type: Boolean,
      default: false
    },
    url: {
      type: String
    },
    time: {
      type: Date,
      default: Date.now
    }
  }],
  date: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken : {
    type: String
  },
  tokenExpiry: {
    type: Date
  }
});

patientSchema.plugin(passportLocalMongoose);
module.exports = Patient = mongoose.model("Patient", patientSchema);
