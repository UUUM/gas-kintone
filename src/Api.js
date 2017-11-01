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

Api.prototype.recordCreate = function recordCreate(record) {
  return this.fetchPost('record', {record: record.toObject()}, function f(response) {
    return parseInt(response.getContentObject().id, 10);
  });
};

Api.prototype.recordDelete = function recordDelete(id) {
  return this.fetchDelete('records', {ids: [id]}, function f() {
    return true;
  });
};

Api.prototype.recordGet = function recordGet(id) {
  return this.fetchGet('record', {id: id}, function f(response) {
    return new Record(response.getContentObject().record);
  });
};

Api.prototype.recordUpdate = function recordUpdate(id, record) {
  return this.fetchPut('record', {id: id, record: record.toObject()}, function f(response) {
    return parseInt(response.getContentObject().revision, 10);
  });
};
