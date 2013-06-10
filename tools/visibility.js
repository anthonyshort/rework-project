function getRules(options) {
  var prefix = options.prefix || '';
  var suffix = options.suffix || '';
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

  options.breakpoints.forEach(function(n){
    if(n !== options.columns) {
      rules.push(createRule('visibleAt' + n, {
        'display': 'none'
      }));
    }
  });

  rules.push(createRule('invisibleAt' + options.columns, {
    'display': 'none'
  }));

  return rules;
}

module.exports = function(options) {
  return function(style) {
    var rules = getRules(options);
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