testRunner.functions.push(function (test) {
  var subdomain;
  var appId;
  var apiToken;
  var basicAuth;
  var client;

  function setup() {
    var common = new TestCommon();
    subdomain = common.subdomain;
    appId = common.appId;
    apiToken = common.apiToken;
    basicAuth = common.basicAuth;
    client = common.getClient();
  }

  test('new Client()', function (assert) {
    setup();

    assert.throws(
      function () {
        return new Client(1, appId, apiToken);
      },
      'throws an exception if subdomain was not a string'
    );

    assert.throws(
      function () {
        return new Client('', appId, apiToken);
      },
      'throws an exception if subdomain was an empty string'
    );

    assert.throws(
      function () {
        return new Client(subdomain, 'appId', apiToken);
      },
      'throws an exception if appId was not a number'
    );

    assert.throws(
      function () {
        return new Client(subdomain, 0, apiToken);
      },
      'throws an exception if appId was not a positive integer'
    );

    assert.throws(
      function () {
        return new Client(subdomain, appId, 1);
      },
      'throws an exception if apiToken was not a string'
    );

    assert.throws(
      function () {
        return new Client(subdomain, appId, '');
      },
      'throws an exception if apiToken was an empty string'
    );

    client = new Client(subdomain, appId, apiToken, basicAuth);
    assert.ok(client instanceof Client, 'creates Client object with a valid argument');
    assert.equal(client.subdomain, subdomain, 'has a subdomain property');
    assert.equal(client.appId, appId, 'has a appId property');
    assert.equal(client.apiToken, apiToken, 'has an apiToken property');
    assert.deepEqual(client.params, {app: appId}, 'has a valid default parameters');
    assert.equal(client.option.contentType, 'application/json', 'has a valid content type');
    assert.equal(client.option.headers['X-Cybozu-API-Token'], apiToken, 'has a valid apiToken');
    assert.equal(client.option.muteHttpExceptions, true, 'has a valid muteHttpExceptions value');
  });

  test('Client.createQueryString()', function (assert) {
    setup();

    var queryString = client.createQueryString({});
    assert.equal(queryString, '', 'returns an empty string with no parameters');

    queryString = client.createQueryString({foo: 'bar', bar: 'baz'});
    assert.equal(queryString, 'foo=bar&bar=baz', 'returns a query string');

    queryString = client.createQueryString({foo: 'bar', ids: [1, 2]});
    assert.equal(queryString, 'foo=bar&ids%5B0%5D=1&ids%5B1%5D=2', 'returns an array query string');
  });

  test('Client.fetch() with an invalid apiToken', function (assert) {
    setup();

    client = new Client(subdomain, appId, 'apiToken');
    var response = client.fetchGet('record');
    assert.ok(response.getResponseCode() !== 200, 'a response code is not 200');
  });

  test('Client.fetch()', function (assert) {
    setup();

    var response = client.fetchPost('record', {});
    var id = response.getContentObject().id;
    assert.equal(response.getResponseCode(), 200, 'POST returns 200 status code');

    response = client.fetchGet('record', {id: id});
    assert.equal(response.getResponseCode(), 200, 'GET returns 200 status code');

    response = client.fetchPut('record', {id: id, record: {}});
    assert.equal(response.getResponseCode(), 200, 'PUT returns 200 status code');

    response = client.fetchDelete('records', {ids: [id]});
    assert.equal(response.getResponseCode(), 200, 'DELETE returns 200 status code');
  });

  test('Client.getApiUrl()', function (assert) {
    setup();

    assert.equal(
      client.getApiUrl('records'),
      'https://uuum.cybozu.com/k/v1/records.json',
      'returns a valid api url'
    );

    assert.equal(
      client.getApiUrl('record', {app: appId, id: 1}),
      'https://uuum.cybozu.com/k/v1/record.json?app=' + appId + '&id=1',
      'returns a valid api url with query strings'
    );
  });

  test('Client.getAuthorizationHeader()', function (assert) {
    setup();

    assert.deepEqual(
      client.getAuthorizationHeader(),
      { 'X-Cybozu-API-Token': apiToken },
      'returns a valid authorization header'
    );
  });

  test('Client.getHost()', function (assert) {
    setup();

    assert.equal(client.getHost(), 'uuum.cybozu.com', 'returns a valid host name');
  });

  test('Client.getApiPath()', function (assert) {
    setup();

    assert.equal(client.getPath('record'), '/k/v1/record.json', 'returns a valid path');
  });

  test('Client.objMerge()', function (assert) {
    setup();

    var a = {foo: 'foo'};
    var b = {bar: 'bar'};
    var c = {bar: 'baz'};
    var expected = {foo: 'foo', bar: 'baz'};
    assert.deepEqual(client.objMerge(a, b, c), expected, 'merges objects');
  });
});

/* eslint func-names: ["error", "never"] */
