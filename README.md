# Intro to Mongoose

## Lesson Objectives

 - Explain how mongooses is an ORM
 - Install and work with Mongoose 
 - Create a Schema for a collection
 - Create a Model and associate a Schema
 - Create/Find/Update/Delete documents in the database


## Explain what is an ODM/ Intro to Mongoose

ODM stand for Object Document Model. It translates the documents in Mongo into upgraded JavaScript Objects that have more helpful methods and properties when used in conjunction with express.

Rather than use the Mongo shell to create, read, update and delete documents, we'll use an npm package called `mongoose`.

<hr>

#### <g-emoji class="g-emoji" alias="alarm_clock" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/23f0.png">⏰</g-emoji> Activity - 10min

Let's review the [mongoose docs](https://mongoosejs.com/).  The instructor will demo how easy it is to search the docs and find a working example on how to `find` an entry in the database. 

**Your Turn**

- :question: What syntax do we use to `connect` to the mongo database with a name of `tweets`?
- :question: What is the overall syntax for writing a `Schema` a schema?
- :question: What does `useNewUrlParser: true` do and why should we use it?

<hr>

Mongoose will allow us to create schemas, do validations and make it easier to interact with Mongo inside an express app.

## Make a Schema

A schema will allow us to set specific keys in our objects. So if we have a key of `name`, we won't be able to insert other keys that don't match like `firstName` or `names`. This helps keep our data more organized and reduces the chance of errors.

We can also specify the datatypes. We can set the datatype of `name` to a `string`, `age` to a `number`, `dateOfBirth` to a Date, `bff` to a Boolean etc.

We can also make some fields required and we can set default values as well.

Here is a sample Schema, with many options.

```js
const articleSchema = new Schema(
	{
		title: { type: String, required: true, unique: true }, //can say whether we want properties to be required or unique
		author: { type: String, required: true },
		body: String,
		comments: [{ body: String, commentDate: Date }], // can have arrays of objects with specific properties
		publishDate: { type: Date, default: Date.now }, // can set defaults for properties
		hidden: Boolean,
		meta: {
			votes: Number,
			favs: Number,
		},
	},
	{ timestamps: true }
);
```

## Basic Set Up

In order to get coding `student_examples` should already be configured with the following:

| File                 | Purpose                                       |
| -------------------- | --------------------------------------------- |
| controllers/tweet.js | business logic to connect to DB for full CRUD |
| db/connection.js     | sets up a connection to the db                |
| db/seed.js           | some seed data to get us started              |
| models/tweet.js      | schema structure for our data                 |

## Set Up Mongoose

Inside `db/connection.js` we need to do the following:

- import `mongoose`
- define the URI to the mongo database (in our case `tweet`)
- open a connection to the `tweets` database
- export `mongoose`

Let's first import and export `mongoose`

```js
// IMPORT MONGOOSE
const mongoose = require('mongoose');

// rest our code will go here

// EXPORT MONGOOSE
module.exports = mongoose;
```

Now let's define the connection URI to the database we want to use.

```js
// IMPORT MONGOOSE
const mongoose = require('mongoose');
// CONNECTION URI
const mongoURI = 'mongodb://localhost:27017/' + 'tweets';
// EXPORT MONGOOSE
module.exports = mongoose;
```

Mongoose requires a few configuration parameters in order to work the way we need so let's add them.

```js
// IMPORT MONGOOSE
const mongoose = require('mongoose');
// CONNECTION URI
const mongoURI = 'mongodb://localhost:27017/' + 'tweets';
// CONFIG PARAMS
const config = { useUnifiedTopology: true, useNewUrlParser: true };
// EXPORT MONGOOSE
module.exports = mongoose;
```

Almost there. Now we need to connect to mongo at the URI.

```js
// IMPORT MONGOOSE
const mongoose = require('mongoose');
// CONNECTION URI
const mongoURI = 'mongodb://localhost:27017/' + 'tweets';
// CONFIG PARAMS
const config = { useUnifiedTopology: true, useNewUrlParser: true };
// CONNECT TO URI
mongoose.connect(mongoURI, config);
// EXPORT MONGOOSE
module.exports = mongoose;
```

If we run the file in node we will see that it's connected.

```sh
node connection.js
```

<img src="https://i.imgur.com/ZYz3FUF.png">

At this point our terminal has been hijacked by `mongoose` and we would like to get it back by connecting to the `connection` and then `closing` it.

```js
const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/' + 'tweets';
const config = { useUnifiedTopology: true, useNewUrlParser: true };
mongoose.connect(mongoURI, config);

const db = mongoose.connection;
// CLOSE THE BD
db.close();

module.exports = mongoose;
```

We can even provide `error/connected/success` messages about the connections.

```js
const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/' + 'tweets';
const config = { useUnifiedTopology: true, useNewUrlParser: true };
mongoose.connect(mongoURI, config);

const db = mongoose.connection;
// ADDITIONAL MESSAGE CONNECTIONS
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));

db.close();

module.exports = mongoose;
```

## The Tweet Schema

In `models/tweet.js` we will need to do the following:

- import the connection 
- create create a schema.

Let's connect to the db. 
```js
const mongoose = require('../db/connection');
```

Once the connection is established we can create a new instance of the `Schema`

```js
const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

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
```

And with the `Schema` in place we can create a `model`.

```js
const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

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
module.exports = Tweet;
```

## Seeding The Database

Although  `controllers` are the gatekeepers to the data in the database we first need to import and create some seed data.  Let's do this in the `db/seed.js` file.

Here we will do the following:

- import the `connection `to the mongo db 
- import the `Tweet` model 
- create a `connection` to the db 
- import the `seedData.json` file
- create a new document for each element of seed data

First we need to import the connection.

```js
const mongoose = require('../db/connection');
```

Then import the model.

```js
const mongoose = require('../db/connection');
const Tweet = require('../models/tweet');
```

And finally we will need to create a handle on the db connection in order to terminate the connection when we are done. 

```js
const mongoose = require('../db/connection');
const Tweet = require('../models/tweet');
const db = mongoose.connection;
```

### Our First DB Entry

Before we import seed data let's create a single object that contains all the tweet info we need based on the `Scehma` and `Model` we configured earlier.

```js
const myFirstTweet = {
	title: 'Deep Thoughts',
	body: 'Friends, I have been navel-gazing',
	author: 'Karolin',
};
```

Using the `Tweet` model we can create the the `document` and then close the connection.

```js
Tweet.create(myFirstTweet, (error, tweet) => {
	if (error) {
		console.log(error);
	} else {
		console.log(tweet);
	}
	db.close();
});
```

Run the `seed.js` file and let's see it in action

```js
node seed.js
```

We should see:

<img src="https://i.imgur.com/qi4Y5zA.png" />

As we can see a unique `_id` has been assigned to the `document`.

Every time we run `node seed.js` it will run the code, and thus insert this object over and over again. Let's not do that and comment it out.

### Create Many Tweets
Let's insert many more tweets. Inside of the `db` folder there is a file called `seedData.json` and includes the following list of tweets:

```js
[
   {
      "title":"Deep Thoughts",
      "body":"Friends, I have been navel-gazing",
      "author":"Joe"
   },
   {
      "title":"Sage Advice",
      "body":"Friends, I am vegan and so should you",
      "author":"Stack",
      "likes":20
   },
   {
      "title":"Whole Reality",
      "body":"I shall deny friendship to anyone who does not exclusively shop at Whole Foods",
      "author":"Kenny",
      "likes":40
   }
  //...more tweet below
]
```

Let's first import the tweets.

```js
const manyTweets = require('./seedData.json');
```

And then insert them all into the database using `insertMany`. 

```js
Tweet.insertMany(manyTweets, (error, tweets) => {
	if (error) {
		console.log(error);
	} else {
		console.log(tweets);
	}
	db.close();
});
```

Here is the final code.

```js
const mongoose = require('../db/connection');
const Tweet = require('../models/tweet.js');
const db = mongoose.connection;

const manyTweets = require('../db/seed.js');

Tweet.insertMany(manyTweets, (error, tweets) => {
	if (error) {
		console.log(error);
	} else {
		console.log(tweets);
	}
	db.close();
});
```

Run `node seed.js` to see the tweet creation process in action. 

## Promises...Promises...Promises...

It just so happens that mongoose returns a `Promise` which provides us the ability to refactor our code to use `.then()`.

Let's refactor the previous code to use `.then()`

```js
Tweet.insertMany(manyTweets).then((tweets) => {
	console.log(tweets);
	db.close();
});
```

## A Clean Seed

If you seed more than once then you will have duplicates in your db. We can configure our initial `seeding` to delete all items before it creates them.

```js
Tweet.deleteMany({}).then(() => {
	Tweet.insertMany(manyTweets).then((tweets) => {
		console.log(tweets);
		db.close();
	});
});
```

## Find Documents with Mongoose

- Mongoose has 4 methods for this
- `find` - generic
- `findById` - finds by ID - great for Show routes!
- `findOne` - limits the search to the first document found
- [`where`](http://mongoosejs.com/docs/queries.html) - allows you to build queries, we won't cover this today


### Controller Setup

Since our  `controllers` are the gatekeepers to the data in the database let's set that up.  We setup the file almost identical to our `seed.js`. 

```js
const mongoose = require('../db/connection');
const Tweet = require('../models/tweet.js');
const db = mongoose.connection
```

### Find All

Let's now start making some queries.  First we will `find` all documents

```js
Tweet.find((err, tweets) => {
	console.log(tweets);
	db.close();
});
```

Let's limit the fields returned, the second argument allows us to pass a string with the fields we are interested in returning

```js
Tweet.find({}, 'title body', (err, tweets) => {
	console.log(tweets);
	db.close();
});
```

### Find One

Let's look for a specific tweet:

```js
Tweet.find({ title: 'Water' }, (err, tweet) => {
	console.log(tweet);
	db.close();
});
```

### Advanced Queries

We can also use advanced query options. L

<hr>

#### <g-emoji class="g-emoji" alias="alarm_clock" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/23f0.png">⏰</g-emoji> Activity - 10min

Let's review the [mongoose docs](https://mongoosejs.com/).

Now that you know a little more about creating `documents`, review the documents and if you can create a query for the following:

- return tweets with 20 or more likes
- return tweets with 20 or more likes where the `author` is `alex`

<hr>

<!-- ```js
Tweet.find({ likes: { $gte: 20 } }, (err, tweets) => {
  console.log(tweets)
  db.close()
})
``` -->

### Delete Documents with Mongoose

We have two copies of our first tweet and a few options to delete it.

- `deleteOne()` this seems like a great choice
- `.findByIdAndDelete()`- finds by ID - great for delete routes in an express app!

```js
Tweet.deleteOne({ title: 'Deep Thoughts' }, (err, deleted) => {
	console.log(err);
	db.close();
});
```

Or...

```js
Tweet.findByIdAndDelete({ _id: id }, (err, deleted) => {
	console.log(err);
	db.close();
});
```

### Update Documents with Mongoose

Finally, we have a few options for updating

- `update()` - the most generic one
- `findOneAndUpdate()`- Let's us find one and update it
- `findByIdAndUpdate()` - Let's us find by ID and update - great for update/put routes in an express app!

```js
Tweet.findOneAndUpdate(
	{ title: 'Vespa' },
	{ sponsored: true },
	(err, tweet) => {
		if (err) {
			console.log(err);
		} else {
			console.log(tweet);
		}
		db.close();
	}
);
```

If we want to have our updated document returned to us in the callback, we have to set an option of `{new: true}` as the third argument

```js
Tweet.findOneAndUpdate(
	{ title: 'Vespa' },
	{ sponsored: true },
	{ new: true },
	(err, tweet) => {
		if (err) {
			console.log(err);
		} else {
			console.log(tweet);
		}
		db.close();
	}
);
```

We'll see the console.logged tweet will have the value of sponsored updated to true. Without `{new: true}` we would get the original unaltered tweet back.

### Intermediate

We can count how many tweets we have with likes greater than 20

```js
Tweet.countDocuments({ likes: { $gte: 20 } }, (err, tweetCount) => {
	console.log('the number of tweets with more than 19 likes is', tweetCount);
	db.close();
});
```

### Advanced & New-ish!

Mongoose 5.0.0 came out on January 17, 2018
[It has an updated query builder that chains much like jQuery](http://mongoosejs.com/docs/queries.html).

Do a search, limit the number of returned queries to 2, sort them by title

```js
const query = Tweet.find({ likes: { $gte: 20 } }, 'title -_id')
	.limit(2)
	.sort('title');

query.exec((err, tweets) => {
	console.log(tweets);
	db.close();
});
```

In the above code, the query variable is of type Query. A Query enables you to build up a query using chaining syntax, rather than specifying a JSON object. The below 2 examples are equivalent.

`.exec` will allow you to execute the query. You could use this to save a query in a variable and execute it at a later time.

## Bonus - Startup Script For Seed Data

Since we expect that others may download our app and want to have some initial data, we can create a startup script that calls `seed.js`. 

```js
"db:seed": "node ./db/seed.js"
```

### Resources

- [Mongoose Docs](https://mongoosejs.com/)
