var KintoneError = function KintoneError(response) {
  this.response = response;

  var body = response.getBody();
  this.id = body.id;
  this.code = body.code;
  this.message = body.message;
};

KintoneError.prototype.toString = function toString() {
  return this.message;
};
