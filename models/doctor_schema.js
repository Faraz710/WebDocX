const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create doctor schema
const doctorSchema = new Schema({
  profilePic: {
    data: Buffer,
    contentType: String
  },
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
  },
  qualification: {
    type: String
  },
  speciality: {
    type: [String]
  },
  experience: {
    type: Number
  },
  reg_no: {
    type: String
  },
  licensePdf: {
    data: Buffer,
    contentType: String
  },
  home: {
    address: {
      type: String
    },
    city: {
      type: String
    },
    country: {
      type: String
    }
  },
  phoneNumber: {
    type: String
  },
  activated: {
    type: Boolean,
    default: false
  }
});
module.exports = Doctor = mongoose.model("Doctors", doctorSchema);
