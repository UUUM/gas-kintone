testRunner.functions.push(function (test) {
  var error;
  var response;

  function setup() {
    var client = (new TestCommon()).createKintoneClient();
    response = client.fetchGet('record');
    error = new KintoneError(response);
  }

  test('new KintoneError()', function (assert) {
    setup();

    error = new KintoneError(response);
    assert.ok(error instanceof KintoneError, 'creates KintoneError object with a valid argument');
    assert.equal(error.response, response, 'has a response property');
    assert.equal(error.id, response.getBody().id, 'has an id property');
    assert.equal(error.code, response.getBody().code, 'has a code property');
    assert.equal(error.message, response.getBody().message, 'has a message property');
  });
});

/* eslint func-names: ["error", "never"] */
