const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
	messages: [{
		message: {
			type: Schema.Types.Mixed
		},
		type: {
			type: String,
			default: 'text'
		},
		to: {
			type: Schema.Types.ObjectId
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
	}]
});

module.exports = Chat = mongoose.model("Chat", chatSchema);