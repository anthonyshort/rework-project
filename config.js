// var fractionalWidths = require('./plugins/fractional-widths');

var autoprefixer = require('autoprefixer'),
    variables = require('rework-variables'),
    inherit = require('rework-inherit');

module.exports = function(css, rework) {

  // Declare variables
  css.use(variables({

  }));

  // Declare mixins
  css.use(rework.mixin({

  }));

  // Declare functions
  css.use(rework.function({

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
  css.use(rework.at2x());

  // Allow selector extending
  css.use(inherit({
    propertyRegExp: /^extend$/
  }));

  // // Create dimension classes
  // rework.use(fractionalWidths({
  //   fractions: [ 3, 4, 6 ],
  //   prefix: 'fz-',
  //   media: '(max-width: )'
  // }));

  // // Create spacing classes
  // rework.use(spacing({
  //   sizes: ['20px', '40px'],
  //   media: '(max-width: 850px)'
  // }));

  // // Build the grid
  // rework.use(grid({
  //   fontSize: 16,
  //   width: 960,
  //   columns: 12,
  //   breakpoints: [ 4, 6, 8, 10, 12 ]
  // }));

  // Auto-prefix properties and values
  css.use(autoprefixer.rework(["last 2 versions", "ie 8"]));

};