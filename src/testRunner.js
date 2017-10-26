function testRunner() {
  var test = new GasTap();
  var common = new TestCommon();

  if (!common.setup()) {
    Logger.log('Failed to setup test environment');
    return;
  }

  var functions = testRunner.functions;
  for (var i = 0; i < functions.length; i++) {
    try {
      functions[i](test, common);
    } catch (error) {
      test('Exception occurred', function f(assert) {
        Logger.log(error);
        assert.fail(error);
      });
    }
  }

  test.finish();
}

testRunner.functions = [];
