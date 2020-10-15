// CONNECTION TO THE DATABASE
const mongoose = require('../db/connection')
// IMPORT THE SCHEMA CLASS
const Schema = mongoose.Schema
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

// CREATE THE MODEL AND ASSOCIATE IT WITH A SCHEMA
const Tweet = mongoose.model('Tweet', tweetSchema)
// EXPORT THE MODEL
module.exports = Tweet

