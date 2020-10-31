// Connection to the database
const mongoose = require('../db/connection');

// Import the Schema Class
const Schema = mongoose.Schema;
// INSTANTIATE A NEW INSTANCE OF THE SCHEMA CLASS
const tweetSchema = new Schema(
	{
		title: String,
		body: String,
		author: String,
		likes: { type: Number, default: 0 },
		sponsored: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const Tweet = mongoose.model('Tweet', tweetSchema);

// Export the Model
module.exports = Tweet;
