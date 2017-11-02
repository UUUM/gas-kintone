var Records = function Records() {
  this.records = [];
};

Records.prototype.forEach = function forEach(func) {
  var records = this.records;
  for (var i = 0; i < records.length; i++) {
    func(records[i]);
  }
  return this;
};

Records.prototype.get = function get(index) {
  return this.records[index];
};

Records.prototype.getSize = function getSize() {
  return this.records.length;
};

Records.prototype.push = function push(record) {
  if (!(record instanceof Record)) {
    throw new Error('record must be a Record object');
  }

  this.records.push(record);
  return this;
};

Records.prototype.toArray = function toArray() {
  var array = [];
  var records = this.records;
  for (var i = 0; i < records.length; i++) {
    array.push(records[i].toObject());
  }
  return array;
};
