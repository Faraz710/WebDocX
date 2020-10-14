const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
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
  username: {
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
    type: String,
    default: 'cardiology'
  },
  experience: {
    type: Number,
    default: 9
  },
  reg_no: {
    type: String
  },
  license: {
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
  notifications: [{
    notification: {
      type: String
    },
    seen: {
      type: Boolean,
      default: false
    },
    time: {
      type: Date,
      default: Date.now
    }
  }],
  activated: {
    type: Boolean,
    default: false
  }
});

doctorSchema.plugin(passportLocalMongoose);
module.exports = Doctor = mongoose.model("Doctors", doctorSchema);
