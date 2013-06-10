function getRules(options) {
  var n = options.divisions;
  var selector = options.selector || ('.size{size}of' + n);
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
      selectors: [ selector ],
      declarations: declarations
    };
  };

  var getSelector = function(n, total) {
    return selector.replace('{size}', n);
  }

  for (var i = 1; i <= n; i++) {
    rules.push(createRule(getSelector(i, n), {
      'width': parseFloat((i / n * 100).toFixed(6)) + '%'
    }));
  };

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