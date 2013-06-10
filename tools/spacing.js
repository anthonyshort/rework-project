function getRules(options) {
  var rules = [];
  var selector = options.selector || ('.{type}-{size}of' + options.sizes.length);

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

  var getSelector = function(type, size) {
    return selector.replace('{type}', type).replace('{size}', size);
  };

  options.sizes.forEach(function(size, i){
    var n = i + 1;
    rules.push(createRule(getSelector('m', n), {
      'margin': size
    }));
    rules.push(createRule(getSelector('mt', n), {
      'margin-top': size
    }));
    rules.push(createRule(getSelector('mb', n), {
      'margin-bottom': size
    }));
    rules.push(createRule(getSelector('ml', n), {
      'margin-left': size
    }));
    rules.push(createRule(getSelector('mr', n), {
      'margin-right': size
    }));
    rules.push(createRule(getSelector('my', n), {
      'margin-top': size,
      'margin-bottom': size
    }));
    rules.push(createRule(getSelector('mx', n), {
      'margin-left': size,
      'margin-right': size
    }));
    rules.push(createRule(getSelector('p', n), {
      'padding': size
    }));
    rules.push(createRule(getSelector('pt', n), {
      'padding-top': size
    }));
    rules.push(createRule(getSelector('pb', n), {
      'padding-bottom': size
    }));
    rules.push(createRule(getSelector('pl', n), {
      'padding-left': size
    }));
    rules.push(createRule(getSelector('pr', n), {
      'padding-right': size
    }));
    rules.push(createRule(getSelector('py', n), {
      'padding-top': size,
      'padding-bottom': size
    }));
    rules.push(createRule(getSelector('px', n), {
      'padding-left': size,
      'padding-right': size
    }));
  });

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