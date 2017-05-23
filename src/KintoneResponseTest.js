testRunner.functions.push(function (test) {
  var url;
  var response;

  function setup() {
    var properties = PropertiesService.getScriptProperties();
    var subdomain = 'uuum';
    var appId = parseInt(properties.getProperty('KintoneTestAppId'), 10);
    var apiToken = properties.getProperty('KintoneTestApiToken');
    var client = new KintoneClient(subdomain, appId, apiToken);
    url = client.getApiUrl('record');
    response = new KintoneResponse(UrlFetchApp.fetch(url, {muteHttpExceptions: true}));
  }

  test('new KintoneResponse()', function (assert) {
    setup();

    assert.throws(
      function () {
        return new KintoneResponse('foo');
      },
      'throws an exception if response was not a HTTPResponse object'
    );

    var httpResponse = UrlFetchApp.fetch(url, {muteHttpExceptions: true});
    response = new KintoneResponse(httpResponse);
    assert.ok(response instanceof KintoneResponse, 'creates KintoneResponse object with a valid argument');
    assert.equal(response.response, httpResponse, 'has a response property');
  });

  test('KintoneResponse.getBody()', function (assert) {
    setup();

    var body = response.getBody();
    assert.equal(typeof body, 'object', 'returns an object');
    assert.ok(body.hasOwnProperty('code'), 'has a code property');
    assert.ok(body.hasOwnProperty('id'), 'has a id property');
    assert.ok(body.hasOwnProperty('message'), 'has a message property');
  });

  test('KintoneResponse.getHeader()', function (assert) {
    setup();

    var contentType = response.getHeader('Content-Type');
    assert.equal(contentType, 'application/json; charset=UTF-8', 'returns a valid header value');
  });

  test('KintoneResponse.getHeaders()', function (assert) {
    setup();

    var headers = response.getHeaders();
    assert.equal(typeof headers, 'object', 'returns an object');
    assert.equal(headers['Content-Type'], 'application/json; charset=UTF-8', 'has a valid Content-Type');
  });

  test('KintoneResponse.getResponseCode()', function (assert) {
    setup();

    assert.equal(response.getResponseCode(), 520, 'returns an http response code');
  });
});

/* eslint func-names: ["error", "never"] */
