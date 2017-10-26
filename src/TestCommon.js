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

TestCommon.prototype.getClient = function getClient() {
  if (this.client) {
    return this.client;
  }

  this.client = new Client(this.subdomain, this.appId, this.apiToken, this.basicAuth);
  return this.client;
};

TestCommon.prototype.getKintone = function getKintone() {
  if (this.kintone) {
    return this.kintone;
  }

  this.kintone = new Kintone(this.subdomain, this.appId, this.apiToken, this.basicAuth);
  return this.kintone;
};
