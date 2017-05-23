testRunner.functions.push(function (test) {
  var error;
  var response;

  function setup() {
    var properties = PropertiesService.getScriptProperties();
    var subdomain = 'uuum';
    var appId = parseInt(properties.getProperty('KintoneTestAppId'), 10);
    var apiToken = properties.getProperty('KintoneTestApiToken');
    var client = new KintoneClient(subdomain, appId, apiToken);
    var url = client.getApiUrl('record');
    response = new KintoneResponse(UrlFetchApp.fetch(url, {muteHttpExceptions: true}));
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
