function testRunner() {
  var test = new GasTap();

  var functions = testRunner.functions;
  for (var i = 0; i < functions.length; i++) {
    functions[i](test);
  }

  test.finish();
}

testRunner.functions = [];
