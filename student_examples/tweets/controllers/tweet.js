const mongoose = require('../db/connection');
const Tweet = require('../models/tweet');
const db = mongoose.connection;
// Create the db connection in order to close the connection

// Find ALL
const showAll = () => {
	Tweet.find((error, tweets) => {
		console.log('FIND ALL tweets ', tweets);
		db.close();
	});
};
//showAll();

// FIND ALL - RETURN  SUBSET OF KEYS
const subset = () => {
	Tweet.find({}, 'title body', (error, tweets) => {
		console.log('FIND ALL with SUBSET OF KEYS Tweets', tweets);
		db.close();
	});
};
//subset();

const show = () => {
	//Tweet.find({ title: 'Water' }, 'title body', (error, tweet) => {
	Tweet.find({ title: /Water/i }, 'title body', (error, tweet) => {
		console.log('FIND ALL with SUBSET OF KEYS Tweets', tweet);
		db.close();
	});
};
//show();

const showFilter = () => {
	Tweet.find(
		{ likes: { $gte: 20 }, author: /alex/i },
		'title body author likes',
		(error, tweet) => {
			console.log('FIND ALL with SUBSET OF KEYS Tweets', tweet);
			db.close();
		}
	);
};
//showFilter();

/////////////////////////////////////////
// Better way to Filter
const findLikesGreaterThanValueByAuthor = (value, author) => {
	Tweet.find({ author: `${author}`, likes: { $gt: value } })
		.then((tweets) => {
			console.log(tweets);
		})
		.catch((err) => console.log(err))
		.finally(() => {
			db.close();
		});
};
//findLikesGreaterThanValueByAuthor(20, 'Alex');
/////////////////////////////////////////

// Delete One
const deleteOne = () => {
	Tweet.deleteOne({ title: 'Deep Thoughts' })
		.then((deleted) => console.log('deleted', deleted))
		.catch((err) => console.log(err))
		.finally(() => db.close());
};
//deleteOne();

// Delete One
const deleteOneById = (id) => {
	Tweet.deleteOne({ _id: `${id}` })
		.then((deleted) => console.log('deleted', deleted))
		.catch((err) => console.log(err))
		.finally(() => db.close());
};
// The Object Ids are very unique and would differ from example to example.
//deleteOneById('5f8884c22037b82741de56db');

// Delete One
const findOneAndUpdate = () => {
	Tweet.findOneAndUpdate({ title: 'Vespa' }, { sponsored: true }, { new: true })
		.then((updated) => console.log('updated', updated))
		.catch((err) => console.log(err))
		.finally(() => db.close());
};
findOneAndUpdate();
