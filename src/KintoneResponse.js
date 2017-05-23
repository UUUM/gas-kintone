var KintoneResponse = function KintoneResponse(response) {
  if (typeof response !== 'object') {
    throw new Error('response must be an HTTPResponse object');
  }
  this.response = response;
};

KintoneResponse.prototype.getBody = function getBody() {
  if (this.body) {
    return this.body;
  }

  var text = this.response.getContentText();
  if (text) {
    this.body = JSON.parse(text);
  } else {
    this.body = {};
  }
  return this.body;
};

KintoneResponse.prototype.getHeader = function getHeader(key) {
  return this.response.getHeaders()[key];
};

KintoneResponse.prototype.getHeaders = function getHeaders() {
  return this.response.getAllHeaders();
};

KintoneResponse.prototype.getResponseCode = function getResponseCode() {
  return this.response.getResponseCode();
};
