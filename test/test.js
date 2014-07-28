
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Test utilities:
	utils = require( './utils' ),

	// Module to be tested:
	expStream = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'flow-exp', function tests() {
	'use strict';

	it( 'should export a factory function', function test() {
		expect( expStream ).to.be.a( 'function' );
	});

	it( 'should evaluate the exponential function for each streamed data value', function test( done ) {
		var data, expected, eStream;

		// Simulate some data...
		data = [ 1,5,3,4.3,1.1345,0,-1.756 ];

		// Expected values:
		expected = new Array( data.length );
		for ( var i = 0; i < expected.length; i++ ) {
			expected[ i ] = Math.exp( data[ i ] );
		}

		// Create a new exponential stream:
		eStream = expStream().stream();

		// Mock reading from the stream:
		utils.readStream( eStream, onRead );

		// Mock piping a data to the stream:
		utils.writeStream( data, eStream );

		return;

		/**
		* FUNCTION: onRead( error, actual )
		*	Read event handler. Checks for errors and compares streamed data to expected data.
		*/
		function onRead( error, actual ) {
			expect( error ).to.not.exist;

			for ( var i = 0; i < expected.length; i++ ) {
				assert.closeTo(
					actual[ i ],
					expected[ i ],
					0.001
				);
			}
			done();
		} // end FUNCTION onRead()
	});

});