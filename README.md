flow-exp
========

Transform stream factory to evaluate an exponential function for each numeric data value.


## Installation

``` bash
$ npm install flow-exp
```

## API

To create a stream factory,

``` javascript
var expStream = require( 'flow-exp' );

// Create a new factory:
var eStream = expStream();
```

### eStream.stream()

To create a new exponential stream,

``` javascript
var stream = eStream.stream();
```


## Usage

Methods are chainable.

``` javascript
expStream()
	.stream()
	.pipe( /* writable stream */ );
```


## Examples

``` javascript
var eventStream = require( 'event-stream' ),
	eStream = require( 'flow-exp' );

// Create some data...
var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random() );
}

// Create a readable stream:
var readStream = eventStream.readArray( data );

// Create a new exponential stream:
var stream = eStream().stream();

// Pipe the data:
readStream.pipe( stream )
	.pipe( eventStream.map( function( d, clbk ) {
		clbk( null, d.toString()+'\n' );
	}))
	.pipe( process.stdout );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions.

Assuming you have installed Mocha, execute the following command in the top-level application directory to run the tests:

``` bash
$ mocha
```

All new feature development should have corresponding unit tests to validate correct functionality.


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.

