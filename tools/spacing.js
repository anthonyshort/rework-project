function getRules(sizes, prefix, suffix) {
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
      selectors: [ '.' + prefix + selector + suffix],
      declarations: declarations
    };
  };

  sizes.forEach(function(size, i){
    var n = i + 1;
    rules.push(createRule('m-' + n, {
      'margin': size
    }));
    rules.push(createRule('mt-' + n, {
      'margin-top': size
    }));
    rules.push(createRule('mb-' + n, {
      'margin-bottom': size
    }));
    rules.push(createRule('ml-' + n, {
      'margin-left': size
    }));
    rules.push(createRule('mr-' + n, {
      'margin-right': size
    }));
    rules.push(createRule('my-' + n, {
      'margin-top': size,
      'margin-bottom': size
    }));
    rules.push(createRule('mx-' + n, {
      'margin-left': size,
      'margin-right': size
    }));
    rules.push(createRule('p-' + n, {
      'padding': size
    }));
    rules.push(createRule('pt-' + n, {
      'padding-top': size
    }));
    rules.push(createRule('pb-' + n, {
      'padding-bottom': size
    }));
    rules.push(createRule('pl-' + n, {
      'padding-left': size
    }));
    rules.push(createRule('pr-' + n, {
      'padding-right': size
    }));
    rules.push(createRule('py-' + n, {
      'padding-top': size,
      'padding-bottom': size
    }));
    rules.push(createRule('px-' + n, {
      'padding-left': size,
      'padding-right': size
    }));
  });

  return rules;
}

module.exports = function(options) {
  var prefix = options.prefix || '';
  var suffix = options.suffix || '';
  return function(style) {
    var rules = getRules(options.sizes, prefix, suffix);
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