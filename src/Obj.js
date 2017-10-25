var Obj = {};

Obj.isArray = function isArray(x) {
  return Object.prototype.toString.call(x) === '[object Array]';
};

Obj.isGASObject = function isGASObject(x, className) {
  if (Object.prototype.toString.call(x) !== '[object JavaObject]') {
    return false;
  }

  if (className) {
    return x.toString() === className;
  }

  return true;
};

Obj.isInteger = function isInteger(x) {
  return typeof x === 'number' && x % 1 === 0;
};

Obj.isNumber = function isNumber(x) {
  return typeof x === 'number';
};

Obj.isObject = function isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
};

Obj.isString = function isString(x) {
  return typeof x === 'string';
};

Obj.merge = function merge() {
  var obj = {};
  for (var i = 0; i < arguments.length; i++) {
    var argument = arguments[i];
    for (var key in argument) {
      if (!argument.hasOwnProperty(key)) {
        continue;
      }
      obj[key] = argument[key];
    }
  }
  return obj;
};
