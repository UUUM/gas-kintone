testRunner.functions.push(function (test) {
  var error;
  var response;

  function setup() {
    var client = (new TestCommon()).createClient();
    response = client.fetchGet('record');
    error = new ResponseError(response);
  }

  test('new ResponseError()', function (assert) {
    setup();

    error = new ResponseError(response);
    assert.ok(error instanceof ResponseError, 'creates ResponseError object with a valid argument');
    assert.equal(error.response, response, 'has a response property');
    assert.equal(error.id, response.getContentObject().id, 'has an id property');
    assert.equal(error.code, response.getContentObject().code, 'has a code property');
    assert.equal(error.message, response.getContentObject().message, 'has a message property');
  });
});

/* eslint func-names: ["error", "never"] */
