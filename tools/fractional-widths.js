function getRules(n, prefix, suffix, divider) {
  var rules = [];

  var createRule = function(selector, properties) {
    var declarations = Object.keys(properties).map(function(name){
      return {
        type: 'declaration',
        property: name,
        value: properties[name]
      };
    });
    return {
      type: 'rule',
      selectors: [ '.' + prefix + selector + suffix ],
      declarations: declarations
    };
  };

  for (var i = 1; i <= n; i++) {
    rules.push(createRule('w-' + i + divider + n, {
      'width': parseFloat((i / n * 100).toFixed(6)) + '%'
    }));
  };

  return rules;
}

module.exports = function(options) {
  var prefix = options.prefix || '';
  var suffix = options.suffix || '';
  var divider = options.divider || 'of';

  return function(style) {
    var rules = getRules(options.divisions, prefix, suffix, divider);
    if(options.media) {
      style.rules.push({
        type: 'media',
        media: options.media,
        rules: rules
      });
    }
    else {
      style.rules = style.rules.concat(rules);
    }
  };
};