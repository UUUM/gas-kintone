var Api = function Api(client) {
  if (!(client instanceof Client)) {
    throw new Error('client must be an object of Client class');
  }
  this.client = client;

  this.lastResponse = null;
};

Api.prototype.formGet = function formGet() {
  var response = this.lastResponse = this.client.fetchGet('form');
  if (response.getResponseCode() !== 200) {
    return new ResponseError(response);
  }

  return response.getContentObject().properties;
};
