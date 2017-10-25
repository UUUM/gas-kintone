testRunner.functions.push(function (test) {
  test('Obj.isArray()', function (assert) {
    assert.ok(Obj.isArray([]), 'returns true if an argument is an array');
    assert.notOk(Obj.isArray(1), 'returns false if an argument is a number');
    assert.notOk(Obj.isArray(''), 'returns false if an argument is a string');
    assert.notOk(Obj.isArray({}), 'returns false if an argument is an object');
  });

  test('Obj.isGASObject()', function (assert) {
    var gasObj = PropertiesService.getScriptProperties();

    assert.ok(Obj.isGASObject(gasObj), 'returns true if an argument is a GAS object');
    assert.ok(Obj.isGASObject(gasObj, 'ScriptProperties'), 'returns true if an argument is a ScriptProperties object');
    assert.notOk(Obj.isGASObject(1), 'returns false if an argument is an integer number');
    assert.notOk(Obj.isGASObject(''), 'returns false if an argument is a string');
    assert.notOk(Obj.isGASObject([]), 'returns false if an argument is an array');
    assert.notOk(Obj.isGASObject({}), 'returns false if an argument is an object');
  });

  test('Obj.isInteger()', function (assert) {
    assert.ok(Obj.isInteger(1), 'returns true if an argument is an integer number');
    assert.notOk(Obj.isInteger(1.1), 'returns false if an argument is a floating number');
    assert.notOk(Obj.isInteger(''), 'returns false if an argument is a string');
    assert.notOk(Obj.isInteger([]), 'returns false if an argument is an array');
    assert.notOk(Obj.isInteger({}), 'returns false if an argument is an object');
  });

  test('Obj.isNumber()', function (assert) {
    assert.ok(Obj.isNumber(1), 'returns true if an argument is an integer number');
    assert.ok(Obj.isNumber(1.1), 'returns true if an argument is a floating number');
    assert.notOk(Obj.isNumber(''), 'returns false if an argument is a string');
    assert.notOk(Obj.isNumber([]), 'returns false if an argument is an array');
    assert.notOk(Obj.isNumber({}), 'returns false if an argument is an object');
  });

  test('Obj.isString()', function (assert) {
    assert.ok(Obj.isString(''), 'returns true if an argument is a string');
    assert.notOk(Obj.isString(1), 'returns false if an argument is a number');
    assert.notOk(Obj.isString([]), 'returns false if an argument is an array');
    assert.notOk(Obj.isString({}), 'returns false if an argument is an object');
  });

  test('Obj.isObject()', function (assert) {
    assert.ok(Obj.isObject({}), 'returns true if an argument is an object');
    assert.notOk(Obj.isObject(1), 'returns false if an argument is a number');
    assert.notOk(Obj.isObject(''), 'returns false if an argument is a string');
    assert.notOk(Obj.isObject([]), 'returns false if an argument is an array');
  });

  test('Obj.merge()', function (assert) {
    var a = {foo: 'foo'};
    var b = {bar: 'bar'};
    var c = {bar: 'baz'};
    var expected = {foo: 'foo', bar: 'baz'};
    assert.deepEqual(Obj.merge(a, b, c), expected, 'merges objects');
  });
});

/* eslint func-names: ["error", "never"] */
