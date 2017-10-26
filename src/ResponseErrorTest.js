testRunner.functions.push(function (test, common) {
  test('new ResponseError()', function (assert) {
    var client = common.getClient();

    var response = client.fetchGet('record');
    var content = response.getContentObject();

    var error = new ResponseError(response);
    assert.ok(error instanceof ResponseError, 'creates ResponseError object with a valid argument');
    assert.equal(error.response, response, 'has a response property');
    assert.equal(error.id, content.id, 'has an id property');
    assert.equal(error.code, content.code, 'has a code property');
    assert.equal(error.message, content.message, 'has a message property');
  });
});

/* eslint func-names: ["error", "never"] */
