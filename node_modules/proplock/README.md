Proplock
=========

A utility for enhancing concurrency control for mongo databases by restricting corruption due to propogation. Built on semaphore.js

## Installation

  npm install proplock --save

## Usage


<code>
	var proplock = require('proplock');

	var lock = proplock.lock;
	var unlock = proplock.unlock;
	var mongoose = require('mongoose');

	mongoose.connect('mongodb://<\your.mongo.url>', function(err, db) {
	    if (err) throw err;
	    console.log("Some Kind of affirmation");
	});

	/* to enforce concurrency */
	problock.lock(mongoose);

	/* to remove enforcement */
	proplock.unlock(mongoose);
</code>


## Tests

  npm test

## Contributing

All contributions are welcomed and encouraged. The project is entirely stable and useable but definite enhancements can be made at its core. Permutations of this project can be done at liberty with no permission or acknowledgement required.

Keep your stick on the ice.

## Release History

* 0.1.0 Initial release
* 0.2.0 Integration of enhanced semaphore caching mechanisms
* 0.2.1 Minor restructuring of db handeling
* 0.2.2 Change of use of db wrapper class
* 0.2.3 Modified codebase to use Mongoose instead of general db
* 0.2.4 Altered semaphore locking structure to use auto-invoking functions