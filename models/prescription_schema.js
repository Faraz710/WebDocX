const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
	doctor: {
		name: {
			type: String
		},
		qualification: {
			type: String
		},
		reg_no: {
		    type: String
		},
		digitalSign: {
			data: Buffer,
			contentType: String
		}
	},
	patient: {
		_id: {
			type: Schema.Types.ObjectId
		},
		name: {
			type: String
		},
		age: {
			type: Number
		},
		sex: {
			type: String
		}
	},
	symptoms: {
		type: [String]
	},
	description: {
		type: String
	},
	diagnosis: {
		type: String
	},
	medicines: [{
		name: {
			type: String
		},
		dosage: {
			type: Number
		},
		duration: {
			type: Number
		},
		instruction: {
			type: String
		}
	}],
	remarks: {
		type: String
	},
	issuingDate: {
		type: Date,
    	default: Date.now
	},
	pdf: {
    	data: Buffer,
    	contentType: String
	}
});

module.exports = Prescription = mongoose.model("Prescription", prescriptionSchema);