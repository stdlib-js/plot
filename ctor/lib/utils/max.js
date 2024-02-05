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

/**
* Computes a maximum value.
*
* @private
* @param {NumericArray} arr - input array
* @returns {(number|null)} maximum value or null
*/
function getMax( arr ) {
	var max;
	var i;
	if ( arr.length === 0 ) {
		return null;
	}
	max = arr[ 0 ];
	for ( i = 1; i < arr.length; i++ ) {
		if ( arr[ i ] > max ) {
			max = arr[ i ];
		}
	}
	return max;
}


// EXPORTS //

module.exports = getMax;
