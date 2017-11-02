testRunner.functions.push(function (test) {
  test('new Records()', function (assert) {
    var records = new Records();
    assert.ok(records instanceof Records, 'create a Records object');
  });

  test('Records.forEach()', function (assert) {
    var records = new Records();
    var rs = [new Record(), new Record()];
    records.push(rs[0]);
    records.push(rs[1]);

    var i = 0;
    records.forEach(function (record) {
      assert.equal(record, rs[i], 'recieves a correct record object');
      i++;
    });
    assert.equal(i, 2, 'loops certin times');
  });

  test('Records.get(),push()', function (assert) {
    assert.throws(
      function () {
        return records.push();
      },
      'throws an exception if a record was not a Record object'
    );

    var records = new Records();
    var record1 = new Record();
    var record2 = new Record();
    assert.equal(records.push(record1), records, 'returns itself');
    assert.equal(records.push(record2), records, 'returns itself');
    assert.equal(records.get(0), record1, 'returns a value record');
    assert.equal(records.get(1), record2, 'returns a value record');
    assert.equal(records.get(2), void 0, 'returns undefined if value dit not exist');
  });

  test('Records.getSize()', function (assert) {
    var records = new Records();
    assert.equal(records.getSize(), 0, 'returns an exact array size');

    records.push(new Record());
    assert.equal(records.getSize(), 1, 'returns an exact array size');

    records.push(new Record());
    assert.equal(records.getSize(), 2, 'returns an exact array size');
  });
});

/* eslint func-names: ["error", "never"] */
