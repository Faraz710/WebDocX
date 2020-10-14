const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
	doctorId: {
		type: Schema.Types.ObjectId
	},
	patientId: {
		type: Schema.Types.ObjectId
	},
	messages: [{
		message: {
			type: String
		},
		time: {
			type: Date,
    		default: Date.now
		}
	}],
	solved: {
		type: Boolean,
		default: false
	},
	publish: {
		type: Boolean,
		default: false
	}
});

module.exports = Consultation = mongoose.model("Consultations", consultationSchema);