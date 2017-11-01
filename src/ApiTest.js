testRunner.functions.push(function (test, common) {
  test('new Api()', function (assert) {
    assert.throws(
      function () {
        return new Api({});
      },
      'thorws an exception if client was not a Client object'
    );

    var client = common.getClient();
    var api = new Api(client);
    assert.ok(api instanceof Api, 'creates an Api object with valid arguments');
    assert.equal(api.client, client, 'has a client property');
    assert.equal(api.lastResponse, null, 'has a lastResponse property');
  });

  test('Api.formGet()', function (assert) {
    var api = common.getApi();

    var form = api.formGet();
    assert.equal(form.length, 1, 'has 1 field');
    assert.equal(form[0].code, 'one_line_text', 'first field is one_line_text');
  });

  test('Api record CRUD', function (assert) {
    var api = common.getApi();
    var id;

    // recordCreate()
    (function () {
      var record = new Record({one_line_text: {value: 'foo'}});

      id = api.recordCreate(record);
      assert.equal(typeof id, 'number', 'recordCreate(): id is a number');
      assert.ok(id > 0, 'recordCreate(): id is a positive number');
    })();

    // recordGet()
    (function () {
      var record = api.recordGet(id);
      assert.equal(record.getValue('$id'), id, 'recordGet(): id is same as a created record id');
      assert.equal(record.getValue('one_line_text'), 'foo', 'recordGet(): one_line_text value is accurate');

      var error = api.recordGet(0);
      assert.ok(error instanceof ResponseError, 'recordGet(): return ResponseError object if an error was occurred');
    })();

    // recordUpdate()
    (function () {
      var record = new Record({one_line_text: {value: 'bar'}});
      var revision = api.recordUpdate(id, record);
      assert.equal(revision, 2, 'recordUpdate(): revision was incremented after updating');

      record = api.recordGet(id);
      assert.equal(record.getValue('one_line_text'), 'bar', 'recordUpdate(): one_line_text value has been changed');

      var error = api.recordUpdate(0, record);
      assert.ok(error instanceof ResponseError, 'recordUpdate(): return ResponseError object if an error was occurred');
    })();

    // recordDelete()
    (function () {
      var result = api.recordDelete(id);
      assert.equal(result, true, 'recordDelete(): remove a record');

      var error = api.recordDelete(id);
      assert.ok(error instanceof ResponseError, 'recordDelete(): return ResponseError object if an error was occurred');
    })();
  });
});

/* eslint func-names: ["error", "never"] */
