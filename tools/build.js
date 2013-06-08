var rework = require('rework'),
    conf = require('../config'),
    stdin = require('stdin'),
    props = rework.properties;

stdin(function(css){
  var style = rework(css);
  conf(style, rework);
  process.stdout.write(style.toString({ compress: false }));
});