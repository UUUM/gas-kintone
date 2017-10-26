testRunner.functions.push(function (test, common) {
  test('new Response()', function (assert) {
    assert.throws(
      function () {
        return new Response('foo');
      },
      'throws an exception if response was not a HTTPResponse object'
    );

    var httpResponse = UrlFetchApp.fetch(common.getClient().getApiUrl(''), {muteHttpExceptions: true});
    var response = new Response(httpResponse);
    assert.ok(response instanceof Response, 'creates Response object with a valid argument');
    assert.equal(response.response, httpResponse, 'has a response property');
  });

  test('Response.getContentObject()', function (assert) {
    var content = common.getErrorResponse().getContentObject();
    assert.ok(Obj.isObject(content), 'returns an object');
    assert.ok(content.hasOwnProperty('code'), 'has a code property');
    assert.ok(content.hasOwnProperty('id'), 'has a id property');
    assert.ok(content.hasOwnProperty('message'), 'has a message property');
  });

  test('Response.getHeader()', function (assert) {
    var contentType = common.getErrorResponse().getHeader('Content-Type');
    assert.equal(contentType, 'application/json;charset=UTF-8', 'returns a valid header value');
  });

  test('Response.getHeaders()', function (assert) {
    var headers = common.getErrorResponse().getHeaders();
    assert.ok(Obj.isObject(headers), 'returns an object');
    assert.equal(headers['Content-Type'], 'application/json;charset=UTF-8', 'has a valid Content-Type');
  });

  test('Response.getResponseCode()', function (assert) {
    assert.equal(common.getErrorResponse().getResponseCode(), 400, 'returns an http response code');
  });
});

/* eslint func-names: ["error", "never"] */
