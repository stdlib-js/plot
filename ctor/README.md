<!--

@license Apache-2.0

Copyright (c) 2018 The Stdlib Authors.

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

> Create a 2-dimensional plot.

<section class="intro">

<!-- <figure class="figure" align="center" label="fig:intro_plot" src="./srv/scripts/fig_intro_plot.js" alt="Scatterplot with rug plots along the axes."> -->

<!-- </figure> -->

</section>

<!-- /.intro -->

<section class="usage">

## Usage

```javascript
var Plot = require( '@stdlib/plot/ctor' );
```

#### Plot( \[x, y,] \[options] )

Returns a `plot` instance for creating 2-dimensional plots.

```javascript
var plot = new Plot();
// returns <Plot>
```

To provide plot data at instantiation, provide `x` **and** `y` data as arguments.

```javascript
var x = [[0.10, 0.20, 0.30]];
var y = [[0.52, 0.79, 0.64]];

var plot = new Plot( x, y );
// returns <Plot>
```

The function accepts the following `options`:

-   [**autoRender**](#prop-auto-render): `boolean` indicating whether to re-render on a `change` event. Default: `false`.
-   [**autoView**](#prop-auto-view): `boolean` indicating whether to generate an updated view on a `render` event. Default: `false`.
-   [**colors**](#prop-colors): data color(s). Default: `category10`.
-   [**description**](#prop-description): plot description. Default: `''`.
-   [**engine**](#prop-engine): plot engine. Default: `svg`.
-   [**height**](#prop-height): plot height. Default: `400` (pixels).
-   [**labels**](#prop-labels): data labels.
-   [**isDefined**](#prop-is-defined): accessor `function` indicating whether a datum is defined.
-   [**lineStyle**](#prop-line-style): data line style(s). Default: `'-'`.
-   [**lineOpacity**](#prop-line-opacity): data line opacity. Default: `0.9`.
-   [**lineWidth**](#prop-line-width): data line width. Default: `2` (pixels).
-   [**paddingBottom**](#prop-padding-bottom): bottom padding. Default: `80` (pixels).
-   [**paddingLeft**](#prop-padding-left): left padding. Default: `90` (pixels).
-   [**paddingRight**](#prop-padding-right): right padding. Default: `20` (pixels).
-   [**paddingTop**](#prop-padding-top): top padding. Default: `80` (pixels).
-   [**renderFormat**](#prop-render-format): render format. Default: `'vdom'`.
-   [**symbols**](#prop-symbols): data symbols. Default: `'none'`.
-   [**symbolsOpacity**](#prop-symbols-opacity): symbols opacity. Default: `0.9`.
-   [**symbolsSize**](#prop-symbols-size): symbols size. Default: `6` (pixels).
-   [**title**](#prop-title): plot title. Default: `''`.
-   [**viewer**](#prop-viewer): plot viewer. Default: `'none'`.
-   [**width**](#prop-width): plot width. Default: `400` (pixels).
-   [**x**](#prop-x): `x` values. Default: `[]`.
-   [**xAxisOrient**](#prop-x-axis-orient): `x`-axis orientation. Default: `'bottom'`.
-   [**xLabel**](#prop-x-label): `x`-axis label. Default: `'x'`.
-   [**xMax**](#prop-x-max): maximum value of the `x`-axis domain. Default: `null`.
-   [**xMin**](#prop-x-min): minimum value of the `x`-axis domain. Default: `null`.
-   [**xNumTicks**](#prop-x-num-ticks): number of `x`-axis tick marks. Default: `5`.
-   [**xRug**](#prop-x-rug): `boolean` indicating whether to render a rug plot along an `x`-axis.
-   [**xRugOrient**](#prop-x-rug-orient): `x`-axis rug orientation. Default: `'bottom'`.
-   [**xRugOpacity**](#prop-x-rug-opacity): `x`-axis rug opacity. Default: `0.1`.
-   [**xRugSize**](#prop-x-rug-size): `x`-axis rug tick (tassel) size. Default: `6` (pixels).
-   [**xScale**](#prop-x-scale): `x`-axis scale. Default: `'linear'`.
-   [**xTickFormat**](#prop-x-tick-format): `x`-axis tick format. Default: `null`.
-   [**y**](#prop-y): `y` values. Default: `[]`.
-   [**yAxisOrient**](#prop-y-axis-orient): `y`-axis orientation. Default: `'left'`.
-   [**yLabel**](#prop-y-label): `y`-axis label. Default: `'y'`.
-   [**yMax**](#prop-y-max): maximum value of the `y`-axis domain. Default: `null`.
-   [**yMin**](#prop-y-min): minimum value of the `y`-axis domain. Default: `null`.
-   [**yNumTicks**](#prop-y-num-ticks): number of `y`-axis tick marks. Default: `5`.
-   [**yRug**](#prop-y-rug): `boolean` indicating whether to render a rug plot along an `y`-axis.
-   [**yRugOrient**](#prop-y-rug-orient): `y`-axis rug orientation. Default: `'left'`.
-   [**yRugOpacity**](#prop-y-rug-opacity): `y`-axis rug opacity. Default: `0.1`.
-   [**yRugSize**](#prop-y-rug-size): `y`-axis rug tick (tassel) size. Default: `6` (pixels).
-   [**yScale**](#prop-y-scale): `y`-axis scale. Default: `'linear'`.
-   [**yTickFormat**](#prop-y-tick-format): `y`-axis tick format. Default: `null`.

In addition to supporting `x` and `y` data as arguments, the constructor supports providing data via the `x` and `y` options.

```javascript
var opts = {
    'x': [[0.10, 0.20, 0.30]],
    'y': [[0.52, 0.79, 0.64]]
};

var plot = new Plot( opts );
// returns <Plot>
```

Note that `x` and `y` arguments take precedence over `x` and `y` options.

```javascript
var opts = {
    'x': [[0.10, 0.20, 0.30]],
    'y': [[0.52, 0.79, 0.64]]
};

var x = [[0.40, 0.50, 0.60]];
var y = [[0.37, 0.51, 0.44]];

var plot = new Plot( x, y, opts );

var x1 = plot.x;
// returns [[0.40, 0.50, 0.60]]

var y1 = plot.y;
// returns [[0.37, 0.51, 0.44]]
```

* * *

### Methods

<a name="method-render"></a>

#### Plot.prototype.render( \[format] )

Renders a plot.

```javascript
var plot = new Plot();
var vtree = plot.render();
// returns <Object>
```

By default, the method renders a plot as a [virtual DOM tree][vdom]. To render to an alternative format, provide a `format` argument.

```javascript
var plot = new Plot();
var vtree = plot.render( 'html' );
// returns <string>
```

<a name="method-view"></a>

#### Plot.prototype.view( \[viewer] )

Generates a plot view.

```javascript
var plot = new Plot();
plot.view();
```

To generate a particular plot view without updating the [`viewer`](#prop-viewer) property, provide a `viewer`.

```javascript
var plot = new Plot();
plot.view( 'stdout' );
```

* * *

### Writable Properties

<a name="prop-x"></a>

#### Plot.prototype.x

`x` values. The `x` property value must be an `array`, where each element corresponds to a plotted dataset.

```javascript
var plot = new Plot();

// Set:
plot.x = [
    [ 1417563950959, 1417563952959 ], // dataset 1
    [ 1417563950959, 1417563952959 ]  // dataset 2
];

// Get:
var x = plot.x;
// returns [ [ 1417563950959, 1417563952959 ], [ 1417563950959, 1417563952959 ] ]
```

<a name="prop-y"></a>

#### Plot.prototype.y

`y` values. The `y` property value must be an `array`, where each element corresponds to a plotted dataset.

```javascript
var plot = new Plot();

// Set:
plot.y = [
    [ 0.25, 0.23 ], // dataset 1
    [ 0.72, 0.89 ]  // dataset 2
];

// Get:
var y = plot.y;
// returns [ [ 0.25, 0.23 ], [ 0.72, 0.89 ] ]
```

<a name="prop-labels"></a>

#### Plot.prototype.labels

Data labels. During plot creation, each plotted dataset is assigned a `label`. If the number of `labels` is less than the number of plotted datasets, `labels` are reused using modulo arithmetic.

```javascript
var plot = new Plot();

// Set:
plot.labels = [
    'beep', // assigned to datasets 0,2,4,...
    'boop'  // assigned to datasets 1,3,5,...
];

// Get:
var labels = plot.labels;
// returns ['beep','boop']
```

<a name="prop-is-defined"></a>

#### Plot.prototype.isDefined( d, i )

An accessor `function` which defines whether a datum is defined. This accessor is used to define how missing values are encoded. When invoked, the function is provided two arguments:

-   **d**: datum
-   **i**: datum index

```javascript
function isDefined( d ) {
    return ( d !== null );
}

var plot = new Plot();

// Set:
plot.isDefined = isDefined;

// Get:
var fcn = plot.isDefined;
// returns <Function>
```

The default behavior is to ignore values which are `NaN`.

<a name="prop-colors"></a>

#### Plot.prototype.colors

Data colors. To set the `color` for all plotted datasets, provide a `color` name.

```javascript
var plot = new Plot();

// Set:
plot.colors = '#474747';

// Get:
var colors = plot.colors;
// returns ['#474747']
```

To specify the colors for each dataset, provide an `array` of colors. During plot creation, each plotted dataset is assigned one of the provided colors. If the number of colors is less than the number of plotted datasets, colors are reused using modulo arithmetic.

```javascript
var plot = new Plot();

plot.colors = [
    '#000',             // assigned to datasets 0,3,6,9,...
    'rgb(100,100,100)', // assigned to datasets 1,4,7,10,...
    'red'               // assigned to datasets 2,5,8,11,...
];

// Get:
var colors = plot.colors;
// returns ['#000','rgb(100,100,100)','red']
```

A `plot` instance also supports providing the name of a predefined color scheme. The following schemes are supported:

-   **category10**
-   **category20**
-   **category20b**
-   **category20c**

<!-- TODO: display the colors schemes. Should be able to generate via a script and then auto-insert similar to equations -->

```javascript
var plot = new Plot();

// Set:
plot.colors = 'category20';

// Get:
var colors = plot.colors;
// returns <Array>
```

<a name="prop-line-style"></a>

#### Plot.prototype.lineStyle

Data line style(s). The following line styles are supported:

-   `'-'`: solid line.
-   `'--'`: dashed line.
-   `':'`: dotted line.
-   `'-.'`: alternating dashes and dots.
-   `'none'`: no line.

To set the line style for all plotted datasets,

```javascript
var plot = new Plot();

// Set:
plot.lineStyle = '-'; // all solid lines

// Get:
var lineStyle = plot.lineStyle;
// returns ['-']
```

To specify the line style for each dataset, provide an `array` of line styles. During plot creation, each plotted dataset is assigned a `lineStyle`. If the number of line styles is less than the number of plotted datasets, line styles are reused using modulo arithmetic.

```javascript
var plot = new Plot();

plot.lineStyle = [
    ':',    // assigned to datasets 0,3,6,9,...
    'none', // assigned to datasets 1,4,7,10,...
    '--'    // assigned to datasets 2,5,8,11,...
];
```

<a name="prop-line-opacity"></a>

#### Plot.prototype.lineOpacity

Data line opacity, where an opacity of `0.0` makes a line completely transparent and an opacity of `1.0` makes a line completely opaque. To set the opacity for all plotted lines,

```javascript
var plot = new Plot();

// Set:
plot.lineOpacity = 0.9;

// Get:
var opacity = plot.lineOpacity;
// returns [0.9]
```

To specify the line opacity for each dataset, provide an `array` of opacities. During plot creation, each plotted dataset is assigned an opacity. If the number of opacities is less than the number of plotted datasets, opacities are reused using modulo arithmetic.

```javascript
var plot = new Plot();

plot.lineOpacity = [
    0.7, // assigned to datasets 0,3,6,9,...
    0.2, // assigned to datasets 1,4,7,10,...
    1.0  // assigned to datasets 2,5,8,11,...
];
```

<a name="prop-line-width"></a>

#### Plot.prototype.lineWidth

Data line width(s). To set the line widths for all plotted lines,

```javascript
var plot = new Plot();

// Set:
plot.lineWidth = 1;

// Get:
var width = plot.lineWidth;
// returns [1]
```

To specify the line width for each dataset, provide an `array` of widths. During plot creation, each plotted dataset is assigned a line width. If the number of line widths is less than the number of plotted datasets, line widths are reused using modulo arithmetic.

```javascript
var plot = new Plot();

plot.lineWidth = [
    1, // assigned to datasets 0,2,4,...
    3  // assigned to datasets 1,3,5,...
];
```

<a name="prop-symbols"></a>

#### Plot.prototype.symbols

Data symbols. The following symbols are supported:

-   `'closed-circle'`: closed circles.
-   `'open-circle'`: open circles.
-   `'none'`: no symbols.

To set the symbols for all plotted datasets,

```javascript
var plot = new Plot();

// Set:
plot.symbols = 'closed-circle';

// Get:
var sym = plot.symbols;
// returns ['closed-circle']
```

To specify the symbols used for each dataset, provide an `array` of symbols. During plot creation, each plotted dataset is assigned a symbol. If the number of symbols is less than the number of plotted datasets, symbols are reused using modulo arithmetic.

```javascript
var plot = new Plot();

plot.symbols = [
    'closed-circle', // assigned to datasets 0,3,6,9,...
    'none',          // assigned to datasets 1,4,7,10,...
    'open-circle'    // assigned to datasets 2,5,8,11,...
];
```

<a name="prop-symbols-size"></a>

#### Plot.prototype.symbolsSize

Symbols size. To set the size of all symbols,

```javascript
var plot = new Plot();

// Set:
plot.symbolsSize = 4;

// Get:
var size = plot.symbolsSize;
// returns [4]
```

To specify the symbols size for each dataset, provide an `array` of sizes. During plot creation, each plotted dataset is assigned a symbols size. If the number of sizes is less than the number of plotted datasets, sizes are reused using modulo arithmetic.

```javascript
var plot = new Plot();

plot.symbolsSize = [
    4, // assigned to datasets 0,2,4,...
    6  // assigned to datasets 1,3,5,...
];
```

<a name="prop-symbols-opacity"></a>

#### Plot.prototype.symbolsOpacity

Symbols opacity, where an opacity of `0.0` makes a symbol completely transparent and an opacity of `1.0` makes a symbol completely opaque. To set the opacity for all plotted symbols,

```javascript
var plot = new Plot();

// Set:
plot.symbolsOpacity = 0.9;

// Get:
var opacity = plot.symbolsOpacity;
// returns [0.9]
```

To specify the opacity for each dataset, provide an `array` of opacities. During plot creation, each plotted dataset is assigned an opacity. If the number of opacities is less than the number of plotted datasets, opacities are reused using modulo arithmetic.

```javascript
var plot = new Plot();

plot.symbolsOpacity = [
    0.7, // assigned to datasets 0,3,6,9,...
    0.2, // assigned to datasets 1,4,7,10,...
    1.0  // assigned to datasets 2,5,8,11,...
];
```

<a name="prop-width"></a>

#### Plot.prototype.width

Plot width (in pixels).

```javascript
var plot = new Plot();

// Set:
plot.width = 720;

// Get:
var width = plot.width;
// returns 720
```

<a name="prop-height"></a>

#### Plot.prototype.height

Plot height (in pixels).

```javascript
var plot = new Plot();

// Set:
plot.height = 480;

// Get:
var height = plot.height;
// returns 480
```

<a name="prop-padding-left"></a>

#### Plot.prototype.paddingLeft

Plot left padding (in pixels). Left padding is typically used to create space for a left-oriented `y`-axis.

```javascript
var plot = new Plot();

// Set:
plot.paddingLeft = 120;

// Get:
var padding = plot.paddingLeft;
// returns 120
```

<a name="prop-padding-right"></a>

#### Plot.prototype.paddingRight

Plot right padding (in pixels). Right padding is typically used to create space for a right-oriented `y`-axis.

```javascript
var plot = new Plot();

// Set:
plot.paddingRight = 90;

// Get:
var padding = plot.paddingRight;
// returns 90
```

<a name="prop-padding-top"></a>

#### Plot.prototype.paddingTop

Plot top padding (in pixels). Top padding is typically used to create space for a title or top-oriented `x`-axis.

```javascript
var plot = new Plot();

// Set:
plot.paddingTop = 100;

// Get:
var padding = plot.paddingTop;
// returns 100
```

<a name="prop-padding-bottom"></a>

#### Plot.prototype.paddingBottom

Plot bottom padding (in pixels). Bottom padding is typically used to create space for a bottom-oriented `x`-axis.

```javascript
var plot = new Plot();

// Set:
plot.paddingBottom = 105;

// Get:
var padding = plot.paddingBottom;
// returns 105
```

<a name="prop-x-min"></a>

#### Plot.prototype.xMin

Minimum value of the `x`-axis domain. When retrieved, if the value has been set to `null`, the returned value is computed from the `x` data.

```javascript
var plot = new Plot();

// Set:
plot.xMin = -1.0;

// Get:
var xMin = plot.xMin;
// returns -1.0
```

<a name="prop-x-max"></a>

#### Plot.prototype.xMax

Maximum value of the `x`-axis domain. When retrieved, if the value has been set to `null`, the returned value is computed from the `x` data.

```javascript
var plot = new Plot();

// Set:
plot.xMax = 100.0;

// Get:
var xMax = plot.xMax;
// returns 100.0
```

<a name="prop-y-min"></a>

#### Plot.prototype.yMin

Minimum value of the `y`-axis domain. When retrieved, if the value has been set to `null`, the returned value is computed from the `y` data.

```javascript
var plot = new Plot();

// Set:
plot.yMin = -50.0;

// Get:
var yMin = plot.yMin;
// returns -50.0
```

<a name="prop-y-max"></a>

#### Plot.prototype.yMax

Maximum value of the `y`-axis domain. When retrieved, if the value has been set to `null`, the returned value is computed from the `y` data.

```javascript
var plot = new Plot();

// Set:
plot.yMax = 31.4;

// Get:
var yMax = plot.yMax;
// returns 31.4
```

<a name="prop-x-scale"></a>

#### Plot.prototype.xScale

Scale function for mapping values to a coordinate along the `x`-axis. The following `scales` are supported:

-   `'linear'`: linear scale.
-   `'time'`: time scale.

To set the scale,

```javascript
var plot = new Plot();

plot.xScale = 'time';
```

When retrieved, the returned value is a scale `function`.

```javascript
var plot = new Plot();

var xScale = plot.xScale;
// returns <Function>
```

<a name="prop-y-scale"></a>

#### Plot.prototype.yScale

Scale function for mapping values to a coordinate along the `y`-axis. The following `scales` are supported:

-   `'linear'`: linear scale.
-   `'time'`: time scale.

To set the scale,

```javascript
var plot = new Plot();

plot.yScale = 'linear';
```

When retrieved, the returned value is a scale `function`.

```javascript
var plot = new Plot();

var yScale = plot.yScale;
// returns <Function>
```

<a name="prop-x-tick-format"></a>

#### Plot.prototype.xTickFormat

`x`-axis tick format. To set the tick format,

```javascript
var plot = new Plot({
    'xScale': 'time'
});

plot.xTickFormat = '%H:%M';
```

When retrieved, if the value has not been set to `null`, the returned value is a formatting `function`.

```javascript
var plot = new Plot({
    'xScale': 'time',
    'xTickFormat': '%H:%M'
});

var fmt = plot.xTickFormat;
// returns <Function>
```

<a name="prop-y-tick-format"></a>

#### Plot.prototype.yTickFormat

`y`-axis tick format. To set the tick format,

```javascript
var plot = new Plot({
    'yScale': 'linear'
});

plot.yTickFormat = '.0%';
```

When retrieved, if the value has not been set to `null`, the returned value is a formatting `function`.

```javascript
var plot = new Plot({
    'yScale': 'linear',
    'yTickFormat': '.0%'
});

var fmt = plot.yTickFormat;
// returns <Function>
```

<a name="prop-x-num-ticks"></a>

#### Plot.prototype.xNumTicks

Number of `x`-axis tick marks. To set the number of tick marks,

```javascript
var plot = new Plot();

// Set:
plot.xNumTicks = 10;

// Get:
var numTicks = plot.xNumTicks;
// returns 10
```

If the value is set to `null`, the number of tick marks is computed internally.

```javascript
var plot = new Plot();

plot.xNumTicks = null;
```

<a name="prop-y-num-ticks"></a>

#### Plot.prototype.yNumTicks

Number of `y`-axis tick marks. To set the number of tick marks,

```javascript
var plot = new Plot();

// Set:
plot.yNumTicks = 5;

// Get:
var numTicks = plot.yNumTicks;
// returns 5
```

If the value is set to `null`, the number of tick marks is computed internally.

```javascript
var plot = new Plot();

plot.yNumTicks = null;
```

<a name="prop-x-axis-orient"></a>

#### Plot.prototype.xAxisOrient

`x`-axis orientation. The following orientations are supported:

-   `'bottom'`
-   `'top'`

To set the orientation,

```javascript
var plot = new Plot();

// Set:
plot.xAxisOrient = 'top';

// Get:
var orient = plot.xAxisOrient;
// returns 'top'
```

<a name="prop-y-axis-orient"></a>

#### Plot.prototype.yAxisOrient

`y`-axis orientation. The following orientations are supported:

-   `'left'`
-   `'right'`

To set the orientation,

```javascript
var plot = new Plot();

// Set:
plot.yAxisOrient = 'right';

// Get:
var orient = plot.yAxisOrient;
// returns 'right'
```

<a name="prop-x-rug"></a>

#### Plot.prototype.xRug

Boolean flag(s) indicating whether to display a rug plot along the `x`-axis. To set the for flag all plotted datasets,

```javascript
var plot = new Plot();

// Set:
plot.xRug = true;

// Get:
var flgs = plot.xRug;
// returns [true]
```

To specify the flag for each dataset, provide an `array` of `booleans`. During plot creation, each plotted dataset is assigned a flag. If the number of flags is less than the number of plotted datasets, flags are reused using modulo arithmetic.

```javascript
var plot = new Plot();

plot.xRug = [
    true, // assigned to datasets 0,2,4,...
    false // assigned to datasets 1,3,5,...
];
```

<a name="prop-y-rug"></a>

#### Plot.prototype.yRug

Boolean flag(s) indicating whether to display a rug plot along the `y`-axis. To set the for flag all plotted datasets,

```javascript
var plot = new Plot();

// Set:
plot.yRug = true;

// Get:
var flgs = plot.yRug;
// returns [true]
```

To specify the flag for each dataset, provide an `array` of `booleans`. During plot creation, each plotted dataset is assigned a flag. If the number of flags is less than the number of plotted datasets, flags are reused using modulo arithmetic.

```javascript
var plot = new Plot();

plot.yRug = [
    false, // assigned to datasets 0,2,4,...
    true   // assigned to datasets 1,3,5,...
];
```

<a name="prop-x-rug-orient"></a>

#### Plot.prototype.xRugOrient

`x`-axis rug orientation. The following orientations are supported:

-   `'bottom'`
-   `'top'`

To set the orientation for all plotted datasets,

```javascript
var plot = new Plot();

// Set:
plot.xRugOrient = 'top';

// Get:
var orient = plot.xRugOrient;
// returns ['top']
```

To specify the `x`-axis rug orientation for each dataset, provide an `array` of orientations. During plot creation, each plotted dataset is assigned an orientation. If the number of orientations is less than the number of plotted datasets, orientations are reused using modulo arithmetic.

```javascript
var plot = new Plot();

plot.xRugOrient = [
    'bottom', // assigned to datasets 0,2,4,...
    'top'     // assigned to datasets 1,3,5,...
];
```

<a name="prop-y-rug-orient"></a>

#### Plot.prototype.yRugOrient

`y`-axis rug orientation. The following orientations are supported:

-   `'left'`
-   `'right'`

To set the orientation for all plotted datasets,

```javascript
var plot = new Plot();

// Set:
plot.yRugOrient = 'right';

// Get:
var orient = plot.yRugOrient;
// returns ['right']
```

To specify the `y`-axis rug orientation for each dataset, provide an `array` of orientations. During plot creation, each plotted dataset is assigned an orientation. If the number of orientations is less than the number of plotted datasets, orientations are reused using modulo arithmetic.

```javascript
var plot = new Plot();

plot.yRugOrient = [
    'left', // assigned to datasets 0,2,4,...
    'right' // assigned to datasets 1,3,5,...
];
```

<a name="prop-x-rug-opacity"></a>

#### Plot.prototype.xRugOpacity

`x`-axis rug opacity, where an opacity of `0.0` makes a rug completely transparent and an opacity of `1.0` makes a rug completely opaque. To set the opacity for all plotted datasets,

```javascript
var plot = new Plot();

// Set:
plot.xRugOpacity = 0.2;

// Get:
var opacity = plot.xRugOpacity;
// returns [0.2]
```

To specify the `x`-axis rug opacity for each dataset, provide an `array` of opacities. During plot creation, each plotted dataset is assigned an opacity. If the number of opacities is less than the number of plotted datasets, opacities are reused using modulo arithmetic.

```javascript
var plot = new Plot();

plot.xRugOpacity = [
    0.1, // assigned to datasets 0,2,4,...
    1.0  // assigned to datasets 1,3,5,...
];
```

<a name="prop-y-rug-opacity"></a>

#### Plot.prototype.yRugOpacity

`y`-axis rug opacity, where an opacity of `0.0` makes a rug completely transparent and an opacity of `1.0` makes a rug completely opaque. To set the opacity for all plotted datasets,

```javascript
var plot = new Plot();

// Set:
plot.yRugOpacity = 0.4;

// Get:
var opacity = plot.yRugOpacity;
// returns [0.4]
```

To specify the `y`-axis rug opacity for each dataset, provide an `array` of opacities. During plot creation, each plotted dataset is assigned an opacity. If the number of opacities is less than the number of plotted datasets, opacities are reused using modulo arithmetic.

```javascript
var plot = new Plot();

plot.yRugOpacity = [
    0.7, // assigned to datasets 0,2,4,...
    0.1  // assigned to datasets 1,3,5,...
];
```

<a name="prop-x-rug-size"></a>

#### Plot.prototype.xRugSize

`x`-axis rug tick (tassel) size. To set the tick size for all plotted datasets,

```javascript
var plot = new Plot();

// Set:
plot.xRugSize = 4;

// Get:
var size = plot.xRugSize;
// returns [4]
```

To specify the `x`-axis rug size for each dataset, provide an `array` of sizes. During plot creation, each plotted dataset is assigned a tick size. If the number of sizes is less than the number of plotted datasets, sizes are reused using modulo arithmetic.

```javascript
var plot = new Plot();

plot.xRugSize = [
    4, // assigned to datasets 0,3,6,...
    6, // assigned to datasets 1,4,7,...
    4  // assigned to datasets 2,5,8,...
];
```

<a name="prop-y-rug-size"></a>

#### Plot.prototype.yRugSize

`y`-axis rug tick (tassel) size. To set the tick size for all plotted datasets,

```javascript
var plot = new Plot();

// Set:
plot.yRugSize = 4;

// Get:
var size = plot.yRugSize;
// returns [4]
```

To specify the `y`-axis rug size for each dataset, provide an `array` of sizes. During plot creation, each plotted dataset is assigned a tick size. If the number of sizes is less than the number of plotted datasets, sizes are reused using modulo arithmetic.

```javascript
var plot = new Plot();

plot.yRugSize = [
    6, // assigned to datasets 0,3,6,...
    4, // assigned to datasets 1,4,7,...
    4  // assigned to datasets 2,5,8,...
];
```

<a name="prop-description"></a>

#### Plot.prototype.description

Plot description.

```javascript
var plot = new Plot();

// Set:
plot.description = 'A plot of `x` vs `y`.';

// Get:
var desc = plot.description;
// returns 'A plot of `x` vs `y`.'
```

<a name="prop-title"></a>

#### Plot.prototype.title

Plot title.

```javascript
var plot = new Plot();

// Set:
plot.title = 'Time Series';

// Get:
var title = plot.title;
// returns 'Time Series'
```

<a name="prop-x-label"></a>

#### Plot.prototype.xLabel

`x`-axis label.

```javascript
var plot = new Plot();

// Set:
plot.xLabel = 'time';

// Get:
var label = plot.xLabel;
// returns 'time'
```

<a name="prop-y-label"></a>

#### Plot.prototype.yLabel

`y`-axis label.

```javascript
var plot = new Plot();

// Set:
plot.yLabel = 'value';

// Get:
var label = plot.yLabel;
// returns 'value'
```

<a name="prop-engine"></a>

#### Plot.prototype.engine

Plot rendering engine. The following engines are supported:

-   `'svg'`

```javascript
var plot = new Plot();

// Set:
plot.engine = 'svg';

// Get:
var engine = plot.engine;
// returns 'svg'
```

<a name="prop-render-format"></a>

#### Plot.prototype.renderFormat

Plot render format. The following formats are supported:

-   `'vdom'`
-   `'html'`

```javascript
var plot = new Plot();

// Set:
plot.renderFormat = 'html';

// Get:
var fmt = plot.renderFormat;
// returns 'html'
```

<a name="prop-auto-render"></a>

#### Plot.prototype.autoRender

Rendering mode. If `true`, an instance renders on each `'change'` event; otherwise, rendering must be triggered manually.

```javascript
var plot = new Plot();

// Set:
plot.autoRender = false;

// Get:
var mode = plot.autoRender;
// returns false
```

<a name="prop-viewer"></a>

#### Plot.prototype.viewer

Plot viewer. The following viewers are supported:

-   `'none'`
-   `'stdout'`
-   `'window'`
-   `'browser'`

```javascript
var plot = new Plot();

// Set:
plot.viewer = 'window';

// Get:
var viewer = plot.viewer;
// returns 'window'
```

<a name="prop-auto-view"></a>

#### Plot.prototype.autoView

Viewer mode. If `true`, an instance generates an updated view on each `'render'` event; otherwise, generating a view must be triggered manually.

```javascript
var plot = new Plot();

// Set:
plot.autoView = true;

// Get:
var mode = plot.autoView;
// returns true
```

* * *

### Computed Properties

<a name="prop-graph-width"></a>

#### Plot.prototype.graphWidth

Returns the expected graph width.

```javascript
var plot = new Plot({
    'width': 100,
    'paddingLeft': 20,
    'paddingRight': 10
});
var width = plot.graphWidth;
// returns 70
```

<a name="prop-graph-height"></a>

#### Plot.prototype.graphHeight

Returns the expected graph height.

```javascript
var plot = new Plot({
    'height': 500,
    'paddingTop': 10,
    'paddingBottom': 120
});
var height = plot.graphHeight;
// returns 370
```

<a name="prop-x-domain"></a>

#### Plot.prototype.xDomain

Returns the `x`-axis domain.

```javascript
var plot = new Plot({
    'xMin': -1.0,
    'xMax': 1.0
});
var domain = plot.xDomain;
// returns [-1.0,1.0]
```

<a name="prop-y-domain"></a>

#### Plot.prototype.yDomain

Returns the `y`-axis domain.

```javascript
var plot = new Plot({
    'yMin': 0.0,
    'yMax': 100.0
});
var domain = plot.yDomain;
// returns [0.0,100.0]
```

<a name="prop-x-range"></a>

#### Plot.prototype.xRange

Returns the `x`-axis range.

```javascript
var plot = new Plot({
    'width': 100,
    'paddingLeft': 10,
    'paddingRight': 10
});
var range = plot.xRange;
// returns [0,80]
```

<a name="prop-y-range"></a>

#### Plot.prototype.yRange

Returns the `y`-axis range.

```javascript
var plot = new Plot({
    'height': 500,
    'paddingTop': 10,
    'paddingBottom': 120
});
var range = plot.yRange;
// returns [370,0]
```

<a name="prop-x-pos"></a>

#### Plot.prototype.xPos

Returns a `function` to map values to `x`-axis coordinate values.

```javascript
var plot = new Plot();
var xPos = plot.xPos;
// returns <Function>
```

<a name="prop-y-pos"></a>

#### Plot.prototype.yPos

Returns a `function` to map values to `y`-axis coordinate values.

```javascript
var plot = new Plot();
var yPos = plot.yPos;
// returns <Function>
```

</section>

<!-- /.usage -->

<section class="examples">

* * *

## Examples

<!-- eslint no-undef: "error" -->

```javascript
var randn = require( '@stdlib/random/base/box-muller' );
var Float64Array = require( '@stdlib/array/float64' );
var plot = require( '@stdlib/plot/ctor' );

var now;
var x;
var y;
var i;

// Create some data...
now = ( new Date() ).getTime();
x = new Float64Array( 100 );
y = new Float64Array( x.length );
for ( i = 0; i < x.length; i++ ) {
    x[ i ] = now + (i*360000);
    y[ i ] = 50.0 + (10.0*randn());
}

// Create a new plot:
var h = plot( [x], [y], {
    'width': 600,
    'height': 480,
    'xScale': 'time',
    'xTickFormat': '%H:%M',
    'renderFormat': 'html',
    'autoRender': true
});

// Render as a virtual DOM tree:
var vtree = h.render( 'vdom' );
console.log( JSON.stringify( vtree ) );

// Render as HTML:
var html = h.render();
console.log( html );

// Listen for 'render' events (e.g., when triggered due to changes in state):
h.on( 'render', onRender );

setTimeout( update, 1000 );

function update() {
    h.width = 720;
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

-   <span class="package-name">[`@stdlib/plot`][@stdlib/plot]</span><span class="delimiter">: </span><span class="description">plotting.</span>

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[vdom]: https://github.com/Matt-Esch/virtual-dom

<!-- <related-links> -->

[@stdlib/plot]: https://github.com/stdlib-js/plot/tree/main

<!-- </related-links> -->

</section>

<!-- /.links -->
