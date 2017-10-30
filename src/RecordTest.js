testRunner.functions.push(function (test) {
  test('new Record()', function (assert) {
    var record = new Record();
    assert.ok(record instanceof Record, 'create a Record object');
  });

  test('Record.get(),set()', function (assert) {
    var record = new Record();

    assert.throws(
      function () {
        record.set('foo', 'bar', 'baz');
      },
      'throws an exception if column type was invalid'
    );

    assert.equal(record.get('foo'), void 0, 'returns undefined if value was not set');

    assert.equal(record.set('foo', 'SINGLE_LINE_TEXT'), record, 'returns itself');
    assert.deepEqual(record.get('foo'), {type: 'SINGLE_LINE_TEXT'}, 'returns a valid object');

    assert.equal(record.set('bar', null, 'baz'), record, 'returns itself');
    assert.deepEqual(record.get('bar'), {value: 'baz'}, 'returns a valid object');

    assert.equal(record.set('baz', 'SINGLE_LINE_TEXT', 'foo'), record, 'returns itself');
    assert.deepEqual(record.get('baz'), {type: 'SINGLE_LINE_TEXT', value: 'foo'}, 'returns a valid object');
  });

  test('Record.getType(),setType()', function (assert) {
    var record = new Record();

    assert.throws(
      function () {
        record.setType('foo', 'bar');
      },
      'throws an exception if column type was invalid'
    );

    assert.equal(record.getType('foo'), void 0, 'returns undefined if value was not set');

    assert.equal(record.setType('foo', 'SINGLE_LINE_TEXT'), record, 'returns itself');
    assert.equal(record.getType('foo'), 'SINGLE_LINE_TEXT', 'returns a column type');

    record.setValue('bar', 'baz');
    assert.equal(record.getType('bar'), void 0, 'returns undefined if only value was set');
  });

  test('Record.getValue()', function (assert) {
    var record = new Record();

    assert.equal(record.getValue('foo'), void 0, 'returns undefined if value was not set');

    assert.equal(record.setValue('foo', 'bar'), record, 'returns itself');
    assert.equal(record.getValue('foo'), 'bar', 'returns a column type');

    record.setType('bar', 'SINGLE_LINE_TEXT');
    assert.equal(record.getValue('bar'), void 0, 'returns undefined if only type was set');
  });

  test('Record.has(),remove()', function (assert) {
    var record = new Record();

    // nothing happens when remove a non-existent value
    record.remove('foo');

    assert.notOk(record.has('foo'), 'returns false for a non-existent value');

    record.setType('foo', 'SINGLE_LINE_TEXT');
    assert.notOk(record.has('foo'), 'returns false if only type was set');

    record.setValue('bar', 'baz');
    assert.ok(record.has('bar'), 'returns true if only value was set');

    record.remove('bar');
    assert.notOk(record.has('bar'), 'returns false after removal');
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

  test('Record.toObject()', function (assert) {
    var record = new Record();

    record.setType('foo', 'SINGLE_LINE_TEXT');
    record.setValue('bar', 'baz');
    record.set('baz', 'SINGLE_LINE_TEXT', 'foo');
    assert.deepEqual(
      record.toObject(),
      {
        foo: {
          type: 'SINGLE_LINE_TEXT'
        },
        bar: {
          value: 'baz'
        },
        baz: {
          type: 'SINGLE_LINE_TEXT',
          value: 'foo'
        }
      },
      'returns a valid object'
    );
  });
});

/* eslint func-names: ["error", "never"] */
