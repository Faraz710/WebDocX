const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	title: {
		type: String
	},
	tags: {
		type:[String]
	},
	speciality: {
		type: String,
		default: null
	},
	symptoms: {
		type: [String]
	},
	description: {
		type: String
	},
	patientId: {
		type: Schema.Types.ObjectId
	},
	patientName: {
		type: String
	},
	time: {
		type: Date,
    	default: Date.now
	}
});

module.exports = Post = mongoose.model("Post", postSchema);