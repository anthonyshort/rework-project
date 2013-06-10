var rework = require('rework'),
    conf = require('../rework'),
    stdin = require('stdin'),
    props = rework.properties;

stdin(function(css){
  process.stdout.write(conf(css));
});