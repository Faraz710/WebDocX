const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create doctor schema
const doctorSchema = new Schema({
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
    degree: {
      type: String
    },
    college: {
      type: String
    },
    gradCert: {
      data: Buffer,
      contentType: String
  }
  },
  specialization: {
    type: String
  },
  licensePdf: {
    data: Buffer,
    contentType: String
  },
  reg_no: {
    type: String
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
  activated: {
    type: Boolean,
    default: false
  }
});
module.exports = Doctor = mongoose.model("Doctors", doctorSchema);
