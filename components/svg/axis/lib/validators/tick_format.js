/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNull = require( '@stdlib/assert/is-null' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isFunction = require( '@stdlib/assert/is-function' );
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Validates `tickFormat`.
*
* @private
* @param {*} v - value to test
* @returns {(Error|null)} error object or null
*/
function test( v ) {
	if (
		!isNull( v ) &&
		!isString( v ) &&
		!isFunction( v )
	) {
		return new TypeError( format( 'invalid assignment. `%s` must be a string, function, or null. Value: `%s`.', 'tickFormat', v ) );
	}
	return null;
}


// EXPORTS //

module.exports = test;
