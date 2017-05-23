var KintoneClient = function KintoneClient(subdomain, appId, apiToken) {
  if (typeof subdomain !== 'string' || subdomain.length < 1) {
    throw new Error('subdomain must be specified');
  }
  this.subdomain = subdomain;

  if (typeof appId !== 'number' || appId < 1) {
    throw new Error('appId must be specified');
  }
  this.appId = appId;

  if (typeof apiToken !== 'string' || apiToken.length < 1) {
    throw new Error('apiToken must be specified');
  }
  this.apiToken = apiToken;

  this.option = {
    contentType: 'application/json',
    headers: this.getAuthorizationHeader(),
    muteHttpExceptions: true
  };

  this.params = {
    app: this.appId
  };
};

KintoneClient.prototype.createQueryString = function createQueryString(params) {
  var values = [];
  for (var key in params) {
    if (!params.hasOwnProperty(key)) {
      continue;
    }
    var value = params[key];

    if (value instanceof Array) {
      for (var i = 0; i < value.length; i++) {
        var k = key + '[' + i + ']';
        var v = value[i];
        values.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
      }
    } else {
      values.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
  }
  return values.join('&');
};

KintoneClient.prototype.fetch = function fetch(method, command, queryParams, bodyParams) {
  var params = queryParams ? this.objMerge(this.params, queryParams) : {};
  var url = this.getApiUrl(command, params);

  var option = this.objMerge(this.option, {
    method: method
  });
  if (bodyParams) {
    option.payload = JSON.stringify(this.objMerge(this.params, bodyParams));
  }

  return new KintoneResponse(UrlFetchApp.fetch(url, option));
};

KintoneClient.prototype.fetchDelete = function fetchDelete(command, params) {
  var apiParams = params ? params : {};
  return this.fetch('delete', command, apiParams);
};

KintoneClient.prototype.fetchGet = function fetchGet(command, params) {
  var apiParams = params ? params : {};
  return this.fetch('get', command, apiParams);
};

KintoneClient.prototype.fetchPost = function fetchPost(command, params) {
  var apiParams = params ? params : {};
  return this.fetch('post', command, null, apiParams);
};

KintoneClient.prototype.fetchPut = function fetchPut(command, params) {
  var apiParams = params ? params : {};
  return this.fetch('put', command, null, apiParams);
};

KintoneClient.prototype.getApiUrl = function getApiUrl(command, params) {
  var url = 'https://' + this.getHost() + this.getPath(command);

  var queryString = this.createQueryString(params);
  if (queryString) {
    url += '?' + queryString;
  }

  return url;
};

KintoneClient.prototype.getAuthorizationHeader = function getAuthorizationHeader() {
  return { 'X-Cybozu-API-Token': this.apiToken };
};

KintoneClient.prototype.getHost = function getHost() {
  return this.subdomain + '.cybozu.com';
};

KintoneClient.prototype.getPath = function getPath(command) {
  return '/k/v1/' + command + '.json';
};

KintoneClient.prototype.objMerge = function merge() {
  var obj = {};
  for (var i = 0; i < arguments.length; i++) {
    var argument = arguments[i];
    for (var key in argument) {
      if (!argument.hasOwnProperty(key)) {
        continue;
      }
      obj[key] = argument[key];
    }
  }
  return obj;
};
