var Client = function Client(subdomain, appId, apiToken, basicAuth) {
  this.subdomain = subdomain;
  this.appId = appId;
  this.apiToken = apiToken;
  this.basicAuth = basicAuth;

  if (typeof subdomain !== 'string' || subdomain.length < 1) {
    throw new Error('subdomain must be specified');
  }

  if (typeof appId !== 'number' || appId < 1) {
    throw new Error('appId must be specified');
  }

  if (typeof apiToken !== 'string' || apiToken.length < 1) {
    throw new Error('apiToken must be specified');
  }

  this.option = {
    contentType: 'application/json',
    headers: this.getAuthorizationHeader(basicAuth),
    muteHttpExceptions: true
  };

  this.params = {
    app: this.appId
  };
};

Client.prototype.createQueryString = function createQueryString(params) {
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

Client.prototype.fetch = function fetch(method, command, queryParams, bodyParams) {
  var params = queryParams ? Obj.merge(this.params, queryParams) : {};
  var url = this.getApiUrl(command, params);

  var option = Obj.merge(this.option, {
    method: method
  });
  if (bodyParams) {
    option.payload = JSON.stringify(Obj.merge(this.params, bodyParams));
  }

  return new Response(UrlFetchApp.fetch(url, option));
};

Client.prototype.fetchDelete = function fetchDelete(command, params) {
  var apiParams = params ? params : {};
  return this.fetch('delete', command, apiParams);
};

Client.prototype.fetchGet = function fetchGet(command, params) {
  var apiParams = params ? params : {};
  return this.fetch('get', command, apiParams);
};

Client.prototype.fetchPost = function fetchPost(command, params) {
  var apiParams = params ? params : {};
  return this.fetch('post', command, null, apiParams);
};

Client.prototype.fetchPut = function fetchPut(command, params) {
  var apiParams = params ? params : {};
  return this.fetch('put', command, null, apiParams);
};

Client.prototype.getApiUrl = function getApiUrl(command, params) {
  var url = 'https://' + this.getHost() + this.getPath(command);

  var queryString = this.createQueryString(params);
  if (queryString) {
    url += '?' + queryString;
  }

  return url;
};

Client.prototype.getAuthorizationHeader = function getAuthorizationHeader(basicAuth) {
  var headers = { 'X-Cybozu-API-Token': this.apiToken };

  if (basicAuth) {
    headers.Authorization = 'Basic ' + Utilities.base64Encode(basicAuth[0] + ':' + basicAuth[1]);
  }

  return headers;
};

Client.prototype.getHost = function getHost() {
  return this.subdomain + '.cybozu.com';
};

Client.prototype.getPath = function getPath(command) {
  return '/k/v1/' + command + '.json';
};
