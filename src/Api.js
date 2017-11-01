var Api = function Api(client) {
  if (!(client instanceof Client)) {
    throw new Error('client must be an object of Client class');
  }
  this.client = client;

  this.lastResponse = null;
};

Api.prototype.fetch = function fetch(method, command, params, callback) {
  var response = this.lastResponse = this.client[method].call(this.client, command, params);
  if (response.getResponseCode() !== 200) {
    return new ResponseError(response);
  }

  return callback.call(this, response);
};

Api.prototype.fetchDelete = function fetchDelete(command, params, callback) {
  return this.fetch('fetchDelete', command, params, callback);
};

Api.prototype.fetchGet = function fetchGet(command, params, callback) {
  return this.fetch('fetchGet', command, params, callback);
};

Api.prototype.fetchPost = function fetchPost(command, params, callback) {
  return this.fetch('fetchPost', command, params, callback);
};

Api.prototype.fetchPut = function fetchPut(command, params, callback) {
  return this.fetch('fetchPut', command, params, callback);
};

Api.prototype.formGet = function formGet() {
  return this.fetchGet('form', {}, function f(response) {
    return response.getContentObject().properties;
  });
};
