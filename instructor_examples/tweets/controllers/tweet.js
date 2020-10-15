// IMPORT THE DB CONNECTION
const mongoose = require('../db/connection');
// IMPORT THE TWEET MODEL
const Tweet = require('../models/tweet');
// CREATE THE DB CONNECTION IN ORDER TO CLOSE THE CONNECTION
const db = mongoose.connection;

// FIND ALL - INDEX ROUTE
const index = () => {
    Tweet.find((err, tweets) => {
        console.log('tweets', tweets);
        //CLOSE THE CONNECTION
        db.close();
    });
}
// index()

// FIND ALL - RETURN SUBSET OF KEYS
const indexSubset = () => {
    Tweet.find({}, 'title body', (err, tweets) => {
        console.log('tweets - find all', tweets)
        db.close()
    })
}
// indexSubset()

// FIND ONE - SHOW ROUTE
const show = () => {
    Tweet.find({title: 'Water'}, (err, tweet) => {
         console.log('tweets - find one', tweet);
		db.close();
    })
}
// show()

// RETURN TWEETS WITH 20 OR MORE LIKES
const likeGTE20 = () => {
    Tweet.find({ likes: { $gte: 40 } }, (err, tweets) => {
        console.log(tweets);
        db.close();
    });
}
// likeGTE20()

// RETURN TWEETS WITH 20 OR MORE LIKES AND AUTHOR IS ALEX
const likeGTE20AndAuthor = () => {
    Tweet.find({ author: 'Alex', likes: { $gt: 20 } })
		.then((tweets) => { console.log(tweets)})
		.catch((err) => console.log(err))
		.finally(() => { db.close()});
}
// likeGTE20AndAuthor()

const indexSubsetFilter = () => {
Tweet.find({ title: 'Organic' }, 'title body', (err, tweets) => {
	console.log('tweets - find all', tweets);
	db.close();
});
}
// indexSubsetFilter()