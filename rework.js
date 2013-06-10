var autoprefixer = require('autoprefixer'),
    rework = require('rework'),
    vars = require('rework-variables'),
    widths = require('./tools/fractional-widths'),
    spacing = require('./tools/spacing'),
    visibility = require('./tools/visibility'),
    inherit = require('rework-inherit');

module.exports = function(css, options) {

  // These variables will be available in
  // the CSS and we can use them in the JS
  // You could move these to a separate module
  // so you can access them with other JS modules.
  // Awesome!
  var variables = {
    'base': 16,
    'baseline': 21,
    'baseFontSize': '16px',
    'baseLineHeight': '21px'
  };

  // Replace variables in the CSS
  css.use(vars(variables));

  // You could put this in its own module
  // and access it with your normal JS too.
  // This means you could have a breakpoint module
  // that knows what the current breakpoint is. Imagine
  // the cool stuff you could do!
  var breakpoints = {
    '(min-width: 20rem)': {
      name: 'mobile',
      columns: 4,
      spacing: ['0', '10px', '20px', '40px']
    },
    '(min-width: 30rem)': {
      name: 'mobile-landscape',
      columns: 6,
      spacing: ['0', '10px', '20px', '40px']
    },
    '(min-width: 40rem)': {
      name: 'tablet',
      columns: 8,
      spacing: ['0', '10px', '20px', '40px']
    },
    '(min-width: 50rem)': {
      name: 'tablet-landscape',
      columns: 10,
      spacing: ['0', '10px', '20px', '40px']
    },
    '(min-width: 60rem)': {
      name: 'desktop',
      columns: 12,
      spacing: ['0', '10px', '20px', '40px']
    }
  };

  // We'll use this later
  var breakpointColumns = Object.keys(breakpoints).map(function(key){
    return breakpoints[key].columns;
  });

  // Declare mixins
  // These are simple properties that are replaced
  // with a bunch of other properties. Just return them
  // from the function.
  css.use(rework.mixin({
    'border-top-radius': function(val) {
      return {
        'border-top-left-radius': val,
        'border-top-right-radius': val
      };
    },
    'border-bottom-radius': function(val) {
      return {
        'border-bottom-left-radius': val,
        'border-bottom-right-radius': val
      };
    }
  }));

  // Declare functions
  css.use(rework.function({
    'baseline': function(n) {
      return (n * variables.baseline) + 'px';
    }
  }));

  // Allow inlining of images using inline()
  css.use(rework.inline('./'));

  // Extra easing functions
  css.use(rework.ease());

  // rgba(hex, n)
  css.use(rework.colors());

  // Reference other properties from within a selector
  css.use(rework.references());

  // Retina background images
  if(options.variant !== 'ie8') {
    css.use(rework.at2x());
  }

  // Auto-prefix properties and values
  if(options.variant === 'ie8') {
    css.use(autoprefixer.rework(["ie 8"]));
  }
  else {
    css.use(autoprefixer.rework(["last 2 versions"]));
  }

  // Loop through each breakpoint and generate some
  // breakpoint-specific classes. Normally in Sass you
  // would do this just using loops and mixins, but this
  // is only done once so why don't we just do it here
  if(options.variant !== 'ie8') {
    Object.keys(breakpoints).forEach(function(query, i){
      var data = breakpoints[query];
      css.use(widths({
        selector: '.u-w-{size}at' + data.columns,
        divisions: data.columns,
        media: query
      }));
      css.use(spacing({
        selector: '.u-{type}-{size}at' + data.columns,
        sizes: data.spacing,
        media: query
      }));
      css.use(visibility({
        invisible: '.u-invisibleAt{n}',
        visible: '.u-visibleAt{n}',
        current: data.columns,
        breakpoints: breakpointColumns,
        media: query
      }));
    });
  }

  // Create fallback classes for browsers without
  // any media queries. This could be generated into
  // a separate file so good browsers don't need crap
  // in there just to support IE8
  if(options.variant === 'ie8') {
    css.use(spacing({
      selector: '.u-{type}-{size}at12',
      sizes: ['0', '10px', '20px', '40px']
    }));
    css.use(widths({
      divisions: 12,
      selector: '.u-w-{size}at12',
      divider: 'at'
    }));
    css.use(visibility({
      invisible: '.u-invisibleAt12',
      visible: '.u-visibleAt{n}',
      columns: 12,
      breakpoints: breakpointColumns
    }));
  }

  // Allow selector extending. This comes at the very
  // end so that we can extend any of the classes that
  // have been generated above
  css.use(inherit({
    propertyRegExp: /^extend$/
  }));

};