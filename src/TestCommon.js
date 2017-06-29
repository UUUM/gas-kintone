var TestCommon = function TestCommon() {
  var properties = PropertiesService.getScriptProperties();

  this.subdomain = properties.getProperty('KintoneTestSubdomain');
  this.appId = parseInt(properties.getProperty('KintoneTestAppId'), 10);
  this.apiToken = properties.getProperty('KintoneTestApiToken');

  var basicUser = properties.getProperty('KintoneTestBasicAuthUser');
  var basicPass = properties.getProperty('KintoneTestBasicAuthPass');
  if (basicUser) {
    this.basicAuth = [basicUser, basicPass];
  } else {
    this.basicAuth = null;
  }
};

TestCommon.prototype.createKintone = function createKintone() {
  return new Kintone(this.subdomain, this.appId, this.apiToken, this.basicAuth);
};

TestCommon.prototype.createKintoneClient = function createKintoneClient() {
  return new KintoneClient(this.subdomain, this.appId, this.apiToken, this.basicAuth);
};
