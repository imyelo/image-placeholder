;(function (name, definition) {
  // this is considered "safe":
  var hasDefine = typeof define === 'function';

  if (hasDefine) {
    // AMD Module or CMD Module
    define(definition);
  } else {
    // Assign to common namespaces or simply the global object (window)
    this[name] = definition();
  }
})('ImagePlaceholder', function() {
  var getFormat = function (format) {
    switch (format) {
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'webp':
      return 'image/' + format;
    }
    return 'image/png';
  };

  var lightCombine = function (options, defaults) {
    var result = {};
    var key;
    for (key in defaults) {
      result[key] = defaults[key];
    }
    for (key in options) {
      result[key] = options[key];
    }
    return result;
  };

  var Placeholder = function (options) {
    var defaults = {
      width: 400,
      height: 400,
      textColor: '#969696',
      backgroundColor: '#cccccc',
      text: '',
      format: 'png'
    };
    if (!(this instanceof Placeholder)) {
      return new Placeholder(options);
    }
    this._options = lightCombine(options, defaults);
    return this;
  };

  Placeholder.prototype.generate = function () {
    var options = this._options;
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    var text = options.text || (options.width + ' x ' + options.height);
    var textSize;
    var result;
    textSize = (textSize = (Number(options.height) / 10) || 12) < 12 ? 12 : textSize;
    canvas.width = options.width;
    canvas.height = options.height;
    context.fillStyle = options.backgroundColor;
    context.fillRect(0, 0, options.width, options.height);
    context.fillStyle = options.textColor;
    context.font = textSize + 'px Georgia';
    context.textAlign = 'center';
    context.fillText(text, (options.width / 2), (options.height / 2 + textSize / 2));
    result = canvas.toDataURL(getFormat(options.format));
    canvas = null;
    context = null;
    return result;
  };

  var getSource = function (options) {
    var opts;
    if (arguments.length === 2) {
      opts = {
        width: arguments[0],
        height: arguments[1]
      }
    } else if (arguments.length === 3) {
      opts = arguments[2];
      opts.width = arguments[0];
      opts.height = arguments[1];
    } else {
      opts = options;
    }
    return (new Placeholder(opts)).generate();
  };

  return getSource;

});
