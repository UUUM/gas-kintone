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
    Logger.log(form);
    assert.equal(form.length, 1, 'has 1 field');
    assert.equal(form[0].code, 'one_line_text', 'first field is one_line_text');
  });
});

/* eslint func-names: ["error", "never"] */
