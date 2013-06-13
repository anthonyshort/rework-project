function getRules(options) {
  var invisible = options.invisible || 'invisibleAt{n}';
  var visible = options.visible || 'visibleAt{n}';
  var inline = options.inline || 'inlineAt{n}';
  var inlineBlock = options.inlineBlock || 'inlineBlock{n}';
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

  rules.push(createRule(invisible.replace('{n}', options.current), {
    'display': 'none'
  }));

  rules.push(createRule(visible.replace('{n}', options.current), {
    'display': 'block'
  }));
  
  rules.push(createRule(inline.replace('{n}', options.current), {
    'display': 'inline'
  }));

  rules.push(createRule(inlineBlock.replace('{n}', options.current), {
    'display': 'inline-block'
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
