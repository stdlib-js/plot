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


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# Plot

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Plotting.



<section class="usage">

## Usage

```javascript
import plot from 'https://cdn.jsdelivr.net/gh/stdlib-js/plot@deno/mod.js';
```

#### plot

Plot API.

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
import randn from 'https://cdn.jsdelivr.net/gh/stdlib-js/random/base/box-muller@deno/mod.js';
import Float64Array from 'https://cdn.jsdelivr.net/gh/stdlib-js/array/float64@deno/mod.js';
import now from 'https://cdn.jsdelivr.net/gh/stdlib-js/time/now@deno/mod.js';
import plot from 'https://cdn.jsdelivr.net/gh/stdlib-js/plot@deno/mod.js';

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

This package is part of [stdlib][stdlib], a standard library with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2025. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/plot.svg
[npm-url]: https://npmjs.org/package/@stdlib/plot

[test-image]: https://github.com/stdlib-js/plot/actions/workflows/test.yml/badge.svg?branch=main
[test-url]: https://github.com/stdlib-js/plot/actions/workflows/test.yml?query=branch:main

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/plot/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/plot?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/plot.svg
[dependencies-url]: https://david-dm.org/stdlib-js/plot/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://app.gitter.im/#/room/#stdlib-js_stdlib:gitter.im

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/plot/tree/deno
[deno-readme]: https://github.com/stdlib-js/plot/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/plot/tree/umd
[umd-readme]: https://github.com/stdlib-js/plot/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/plot/tree/esm
[esm-readme]: https://github.com/stdlib-js/plot/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/plot/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/plot/main/LICENSE

<!-- <toc-links> -->

<!-- </toc-links> -->

<!-- <related-links> -->

[@stdlib/plot/ctor]: https://github.com/stdlib-js/plot/tree/main/ctor

<!-- </related-links> -->

</section>

<!-- /.links -->
