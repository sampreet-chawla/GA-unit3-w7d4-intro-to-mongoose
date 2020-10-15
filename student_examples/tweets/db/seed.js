const mongoose = require('./connection');
const Tweet = require('../models/tweet');
const db = mongoose.connection;
const manyTweets = require('./seedData.json');

// CREATE ALL TWEETS USING .THEN()
// Delete all earlier data to avoid duplicates.
Tweet.deleteMany({}).then(() => {
	console.log('Earlier tweets deleted');
	Tweet.insertMany(manyTweets).then((tweets) => {
		console.log('tweets', tweets);
		db.close();
	});
});

// FEED IN MANY TWEETS USING CALLBACK
// Tweet.insertMany(manyTweets, (error, tweets) => {
// 	if (error) {
// 		console.log('error', error);
// 	} else {
// 		console.log('tweets', tweets);
// 	}
// 	db.close();
// });

// OUR FIRST TWEET DATA
// const myFirstTweet = {
// 	title: 'Deep Thoughts',
// 	body: 'Friends, I have been navel-gazing',
// 	author: 'Karolin',
// };

// // create our first Tweet
// Tweet.create(myFirstTweet, (error, tweet) => {
// 	if (error) {
// 		console.log('error', error);
// 	} else {
// 		console.log('tweet', tweet);
// 	}

// 	// Close the DB Connection
// 	db.close();
// });

/* 
ERROR: error MongoError: Topology is closed, please connect. 
RESOLUTION: Comment out the db.close() in connection.js
*/
