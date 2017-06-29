testRunner.functions.push(function (test) {
  var subdomain;
  var appId;
  var apiToken;
  var basicAuth;
  var kintone;

  function setup() {
    var common = new TestCommon();
    subdomain = common.subdomain;
    appId = common.appId;
    apiToken = common.apiToken;
    basicAuth = common.basicAuth;
    kintone = common.createKintone();
  }

  function deleteAllRecords() {
    var ids = [];
    var records = kintone.getAllRecords();
    for (var key in records) {
      if (!records.hasOwnProperty(key)) {
        continue;
      }
      ids.push(records[key].$id);
    }
    kintone.recordsDelete(ids);
  }

  test('new Kintone()', function (assert) {
    setup();

    kintone = new Kintone(subdomain, appId, apiToken, basicAuth);
    assert.ok(kintone instanceof Kintone, 'creates Kintone object with a valid argument');
    assert.ok(kintone.client instanceof KintoneClient, 'has a client property');
  });

  test('Kintone.getAllRecords()', function (assert) {
    setup();

    var ids = kintone.recordsCreate([
      {one_line_text: 'foo'},
      {one_line_text: 'bar'}
    ]);

    var records = kintone.getAllRecords();
    assert.ok(records.length >= 2, 'has more than 2 records');

    records = kintone.getAllRecords(ids[1]);
    assert.equal(records.length, 1, 'has 1 record');

    kintone.recordsDelete(ids);
  });

  test('Kintone.formGet()', function (assert) {
    setup();

    var form = kintone.formGet();
    assert.equal(form.length, 1, 'has 1 field');
    assert.equal(form[0].code, 'one_line_text', 'first field is one_line_text');
  });

  test('Kintone.getFieldCodes()', function (assert) {
    setup();

    var codes = kintone.getFieldCodes();
    assert.equal(codes.length, 1, 'has 1 code');
    assert.equal(codes[0], 'one_line_text', 'first code is one_line_text');
  });

  test('Kintone record CRUD', function (assert) {
    setup();

    var id;

    // recordCreate()
    (function () {
      id = kintone.recordCreate({one_line_text: 'foo'});
      assert.equal(typeof id, 'number', 'recordCreate(): id is a number');
      assert.ok(id > 0, 'recordCreate(): id is a positive number');

      var kintone2 = new Kintone(subdomain, appId, 'apiToken');
      var error = kintone2.recordCreate({one_line_text: 'foo'});
      assert.ok(error instanceof KintoneError, 'recordCreate(): return KintoneError object if an error was occurred');
    })();

    // recordGet()
    (function () {
      var record = kintone.recordGet(id);
      assert.equal(record.$id, id, 'recordGet(): id is same as a created record id');
      assert.equal(record.one_line_text, 'foo', 'recordGet(): one_line_text value is accurate');

      var error = kintone.recordGet(0);
      assert.ok(error instanceof KintoneError, 'recordGet(): return KintoneError object if an error was occurred');
    })();

    // recordUpdate()
    (function () {
      var revision = kintone.recordUpdate(id, {one_line_text: 'bar'});
      assert.equal(revision, 2, 'recordUpdate(): revision was incremented after updating');

      var record = kintone.recordGet(id);
      assert.equal(record.one_line_text, 'bar', 'recordUpdate(): one_line_text value is changed');

      var error = kintone.recordUpdate(0, {});
      assert.ok(error instanceof KintoneError, 'recordUpdate(): return KintoneError object if an error was occurred');
    })();

    // recordDelete()
    (function () {
      var result = kintone.recordDelete(id);
      assert.equal(result, true, 'recordDelete(): remove a record');

      var error = kintone.recordDelete(id);
      assert.ok(error instanceof KintoneError, 'recordDelete(): return KintoneError object if an error was occurred');
    })();
  });

  test('Kintone records CRUD', function (assert) {
    setup();

    var ids;

    // recordsCreate()
    (function () {
      ids = kintone.recordsCreate([
        {one_line_text: 'foo'},
        {one_line_text: 'bar'}
      ]);
      assert.equal(ids.length, 2, 'recordsCreate(): creates 2 records');
      assert.equal(typeof ids[0], 'number', 'recordsCreate(): id0 is a number');
      assert.equal(typeof ids[1], 'number', 'recordsCreate(): id1 is a number');
      assert.ok(ids[0] > 0, 'recordsCreate(): id0 is a positive number');
      assert.ok(ids[1] > 0, 'recordsCreate(): id1 is a positive number');

      var kintone2 = new Kintone(subdomain, appId, 'apiToken');
      var error = kintone2.recordsCreate([]);
      assert.ok(error instanceof KintoneError, 'recordsCreate(): return KintoneError object if an error was occurred');
    })();

    // recordsGet()
    (function () {
      var records = kintone.recordsGet('$id in (' + ids.join(',') + ')');
      assert.equal(records.length, 2, 'recordsGet(): gets 2 records');
      assert.notEqual(ids.indexOf(records[0].$id), -1, 'recordsGet(): records[0].$id is an accurate value');
      assert.notEqual(ids.indexOf(records[1].$id), -1, 'recordsGet(): records[1].$id is an accurate value');
      assert.notEqual(
        ['foo', 'bar'].indexOf(records[0].one_line_text),
        -1,
        'recordsGet(): records[0].one_line_text is an accurate value'
      );
      assert.notEqual(
        ['foo', 'bar'].indexOf(records[1].one_line_text),
        -1,
        'recordsGet(): records[1].one_line_text is an accurate value'
      );

      var error = kintone.recordsGet('$id == 0');
      assert.ok(error instanceof KintoneError, 'recordsGet(): return KintoneError object if an error was occurred');
    })();

    // recordsUpdate()
    (function () {
      var records = [{
        id: ids[0],
        one_line_text: 'hoge'
      }, {
        id: ids[1],
        one_line_text: 'fuga'
      }];
      var result = kintone.recordsUpdate(records);
      assert.notEqual(ids.indexOf(result[0].id), -1, 'recordsUpdate(): result[0].$id is an accurate value');
      assert.notEqual(ids.indexOf(result[1].id), -1, 'recordsUpdate(): result[1].$id is an accurate value');
      assert.equal(result[0].revision, 2, 'recordsUpdate(): result[0].revision was incremented after updating');
      assert.equal(result[1].revision, 2, 'recordsUpdate(): result[1].revision was incremented after updating');

      records = kintone.recordsGet('$id in (' + ids.join(',') + ')');
      assert.notEqual(
        ['hoge', 'fuga'].indexOf(records[0].one_line_text),
        -1,
        'recordsUpdate(): records[0].one_line_text is an accurate value'
      );
      assert.notEqual(
        ['hoge', 'fuga'].indexOf(records[1].one_line_text),
        -1,
        'recordsUpdate(): records[1].one_line_text is an accurate value'
      );

      var error = kintone.recordsUpdate([{id: 0}]);
      assert.ok(error instanceof KintoneError, 'recordsUpdate(): return KintoneError object if an error was occurred');
    })();

    // recordsDelete()
    (function () {
      var result = kintone.recordsDelete(ids);
      assert.equal(result, true, 'recordsDelete(): remove records');

      var error = kintone.recordsDelete(ids);
      assert.ok(error instanceof KintoneError, 'recordsDelete(): return KintoneError object if an error was occurred');
    })();
  });

  deleteAllRecords();
});

/* eslint func-names: ["error", "never"] */
