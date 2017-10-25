var ResponseError = function ResponseError(response) {
  this.response = response;

  var content = response.getContentObject();
  if (content instanceof Object) {
    this.id = content.id;
    this.code = content.code;
    this.message = content.message;
  } else {
    this.message = content;
  }
};

ResponseError.prototype.toString = function toString() {
  return this.message;
};
