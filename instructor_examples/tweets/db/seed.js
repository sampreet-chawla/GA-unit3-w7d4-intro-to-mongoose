// IMPORT THE DB CONNECTION
const mongoose = require('./connection')
// IMPORT THE TWEET MODEL
const Tweet = require('../models/tweet')
// IMPORT THE TWEETS JSON DATA
const tweetsData = require('./seedData.json')
// CREATE THE DB CONNECTION
const db = mongoose.connection
// CREATE ALL THE TWEETS
Tweet.insertMany(tweetsData, (error, tweets) => {
	if (error) {
		console.log('error', error);
	} else {
		console.log('tweets', tweets);
	}
	// CLOSE THE CONNECTION TO THE DB
	db.close();
});

// OUR FIRST TWEET
// const myFirstTweet = {
// 	title: 'Deep Thoughts',
// 	body: 'Friends, I have been navel-gazing',
// 	author: 'Karolin',
// };
// CREATE OUR FIRST TWEET
// Tweet.create(myFirstTweet, (error, tweet) => {
//     if(error) { console.log('error', error)}
//     else { console.log('tweet', tweet)}
//     // CLOSE THE DB CONNECTION
//     db.close()
// })

/*
ERROR: error MongoError: Topology is closed, please connect
ISSUE: db.close() was called in the connection file
RESOLUTION: comment out that link in the connection file
*/
