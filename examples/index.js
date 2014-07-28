var eventStream = require( 'event-stream' ),
	eStream = require( './../lib' );

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