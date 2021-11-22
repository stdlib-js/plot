<!--

@license Apache-2.0

Copyright (c) 2021 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->

# StemLeaf

> Unicode stem-and-leaf charts.

<section class="usage">

## Usage

```javascript
var StemLeaf = require( '@stdlib/plot/unicode/stemleaf' );
```

#### StemLeaf( options )

Create a unicode stem-and-leaf chart.

```javascript
var opts = {
    'x': [ 12, 127, 28, 42, 39, 113, 42, 18, 44, 118, 44, 37, 113, 124, 37 ]
};
var chart = new StemLeaf( opts );
chart.render();
```

</section>

<!-- /.usage -->

<section class="examples">

## Examples

<!-- TODO: better examples -->

<!-- eslint no-undef: "error" -->

```javascript
var SteamLeaf = require( '@stdlib/plot/unicode/steamleaf' );

// Data from [RosettaCode]{@link https://www.rosettacode.org/wiki/Stem-and-leaf_plot#Python}
var x = [
    12, 127, 28, 42, 39, 113, 42, 18, 44, 118, 44, 37, 113, 124, 37,
    48, 127, 36, 29, 31, 125, 139, 131, 115, 105, 132, 104, 123, 35,
    113, 122, 42, 117, 119, 58, 109, 23, 105, 63, 27, 44, 105, 99,
    41, 128, 121, 116, 125, 32, 61, 37, 127, 29, 113, 121, 58, 114
];
var y = [
    126, 53, 114, 96, 25, 109, 7, 31, 141, 46, 13, 27, 43, 117, 116,
    27, 7, 68, 40, 31, 115, 124, 42, 128, 52, 71, 118, 117, 38, 27,
    106, 33, 117, 116, 111, 40, 119, 47, 105, 57, 122, 109, 124, 115,
    43, 120, 43, 27, 27, 18, 28, 48, 125, 107, 114, 34, 133, 45, 120,
    30, 127, 31, 116, 146
];

// Only x values:
var chart = new StemLeaf({
    'x': x
});
console.log( chart.render() );
/* =>
*     1  | 2 8 
*     2  | 3 7 8 9 9 
*     3  | 1 2 5 6 7 7 7 9 
*     4  | 1 2 2 2 4 4 4 8 
*     5  | 8 8 
*     6  | 1 3 
*     7  | 
*     8  | 
*     9  | 9 
*     10 | 4 5 5 5 9 
*     11 | 3 3 3 3 4 5 6 7 8 9 
*     12 | 1 1 2 3 4 5 5 7 7 7 8 
*     13 | 1 2 9 
*     
*    Legend: 
*     X | Y  => 10 * X + Y
*/

// Only y values:
chart = new StemLeaf({
    'y': y
});
console.log( chart.render() );
/* =>
*     0  | 7 7 
*     1  | 3 8 
*     2  | 5 7 7 7 7 7 8 
*     3  | 0 1 1 1 3 4 8 
*     4  | 0 0 2 3 3 3 5 6 7 8 
*     5  | 2 3 7 
*     6  | 8 
*     7  | 1 
*     8  | 
*     9  | 6 
*     10 | 5 6 7 9 9 
*     11 | 1 4 4 5 5 6 6 6 7 7 7 8 9 
*     12 | 0 0 2 4 4 5 6 7 8 
*     13 | 3 
*     14 | 1 6 
*    
*    Legend: 
*     X | Y  => 10 * X + Y
*/

// Compare x and y values:
chart = new StemLeaf({
    'x': x,
    'y': y
});
console.log( chart.render() );
/* =>
*                            |  0 | 7 7 
*                       8 2  |  1 | 3 8 
*                 9 9 8 7 3  |  2 | 5 7 7 7 7 7 8 
*           9 7 7 7 6 5 2 1  |  3 | 0 1 1 1 3 4 8 
*           8 4 4 4 2 2 2 1  |  4 | 0 0 2 3 3 3 5 6 7 8 
*                       8 8  |  5 | 2 3 7 
*                       3 1  |  6 | 8 
*                            |  7 | 1 
*                            |  8 | 
*                         9  |  9 | 6 
*                 9 5 5 5 4  | 10 | 5 6 7 9 9 
*       9 8 7 6 5 4 3 3 3 3  | 11 | 1 4 4 5 5 6 6 6 7 7 7 8 9 
*     8 7 7 7 5 5 4 3 2 1 1  | 12 | 0 0 2 4 4 5 6 7 8 
*                     9 2 1  | 13 | 3 
*    
*    Legend: 
*     X | Y  => 10 * X + Y
*/
```

</section>

<!-- /.examples -->

<section class="related">

</section>

<!-- /.related -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

<!-- <toc-links> -->

<!-- </toc-links> -->

</section>

<!-- /.links -->
