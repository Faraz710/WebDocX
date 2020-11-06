const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Doctor = require('./doctor_schema');
const Patient = require('./patient_schema');

const consultationSchema = new Schema({
	problem: {
		issue: {
			type: String
		},
		tags: {
			type:[String]
		}
	},
	symptoms: {
		type: [String]
	},
	description: {
		type: String
	},
	doctor: {
		type: Schema.Types.ObjectId,
		ref: 'Doctor'
	},
	patient: {
		type: Schema.Types.ObjectId,
		ref: 'Patient'
	},
	chat: [{
		message: {
			type: Schema.Types.Mixed
		},
		type: {
			type: String,
			default: 'text'
		},
		from: {
			type: Schema.Types.ObjectId
		},
		time: {
			type: Date,
			default: Date.now
		},
		read: {
			type: Boolean,
			default: false
		}
	}],
	isSolved: {
		type: Boolean,
		default: false
	},
	isAccepted: {
		type: Boolean,
		default: false
	}
});

module.exports = Consultation = mongoose.model("Consultation", consultationSchema);