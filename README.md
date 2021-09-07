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

# Plot

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] [![dependencies][dependencies-image]][dependencies-url]

> Standard library plotting.

<section class="installation">

## Installation

```bash
npm install @stdlib/plot
```

</section>

<section class="usage">

## Usage

```javascript
var plot = require( '@stdlib/plot' );
```

#### plot

Standard library plotting.

```javascript
var x = [ 1, 2, 3 ];
var y = [ 1, 0, 1 ];

var plt = plot( [ x ], [ y ] );
```

</section>

<!-- /.usage -->

<section class="examples">

## Examples

<!-- TODO: better examples -->

<!-- eslint no-undef: "error" -->

```javascript
var randn = require( '@stdlib/random/base/box-muller' );
var Float64Array = require( '@stdlib/array/float64' );
var now = require( '@stdlib/time/now' );
var plot = require( '@stdlib/plot' );

var t;
var x;
var y;
var i;

// Create some data...
t = now() * 1000;
x = new Float64Array( 100 );
y = new Float64Array( x.length );
for ( i = 0; i < x.length; i++ ) {
    x[ i ] = t + (i*360000);
    y[ i ] = 50.0 + (10.0*randn());
}

// Create a new plot:
var plt = plot( [x], [y], {
    'width': 600,
    'height': 480,
    'xScale': 'time',
    'xTickFormat': '%H:%M',
    'renderFormat': 'html'
});

// Render as a virtual DOM tree:
var vtree = plt.render( 'vdom' );
console.log( JSON.stringify( vtree ) );

// Render as HTML:
var html = plt.render();
console.log( html );

// Listen for 'render' events (e.g., when triggered due to changes in state):
plt.on( 'render', onRender );

setTimeout( update, 1000 );

function update() {
    plt.width = 720;
}

function onRender( html ) {
    console.log( html );
}
```

</section>

<!-- /.examples -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

* * *

## See Also

-   <span class="package-name">[`@stdlib/plot/ctor`][@stdlib/plot/ctor]</span><span class="delimiter">: </span><span class="description">2-dimensional plot constructor.</span>

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2021. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/plot.svg
[npm-url]: https://npmjs.org/package/@stdlib/plot

[test-image]: https://github.com/stdlib-js/plot/actions/workflows/test.yml/badge.svg
[test-url]: https://github.com/stdlib-js/plot/actions/workflows/test.yml

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/plot/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/plot?branch=main

[dependencies-image]: https://img.shields.io/david/stdlib-js/plot.svg
[dependencies-url]: https://david-dm.org/stdlib-js/plot/main

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://gitter.im/stdlib-js/stdlib/

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/plot/main/LICENSE

<!-- <toc-links> -->

<!-- </toc-links> -->

<!-- <related-links> -->

[@stdlib/plot/ctor]: https://github.com/stdlib-js/plot/tree/main/ctor

<!-- </related-links> -->

</section>

<!-- /.links -->
