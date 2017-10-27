testRunner.functions.push(function (test, common) {
  test('new Record()', function (assert) {
    var record = new Record();
    assert.ok(record instanceof Record, 'create a Record object');
  });

  test('Record.get()', function (assert) {
    var record = common.getRecord();
    assert.equal(record.get('foo'), void 0, 'returns undefined if value was not set');
    assert.ok(Obj.isObject(record.get('文字列__1行')), 'returns an object');
  });

  test('Record.getType()', function (assert) {
    var record = common.getRecord();
    assert.equal(record.getType('foo'), void 0, 'returns undefined if value was not set');
    assert.equal(record.getType('文字列__1行'), 'SINGLE_LINE_TEXT', 'returns a valid value');

    record.setValue('foo', 'bar');
    assert.equal(record.getType('foo'), void 0, 'returns undefined if only value was set');
  });

  test('Record.setRecord()', function (assert) {
    var record = new Record();

    assert.throws(
      function () {
        record.setRecord();
      },
      'throws an exception if record was not an object'
    );

    var records = {foo: {type: 'SINGLE_LINE_TEXT', value: 'bar'}};
    var result = record.setRecord(records);
    assert.equal(result, record, 'returns itself');
    assert.deepEqual(record.record, records, 'has a record property');
  });
});

/* eslint func-names: ["error", "never"] */
