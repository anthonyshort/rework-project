function getRules(options) {
  var invisible = options.invisible || 'invisibleAt{n}';
  var visible = options.visible || 'visibleAt{n}';
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

  options.breakpoints.forEach(function(n){
    if(n !== options.current) {
      var selector = visible.replace('{n}', n);
      rules.push(createRule(selector, {
        'display': 'none'
      }));
    }
  });

  rules.push(createRule(invisible.replace('{n}', options.current), {
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