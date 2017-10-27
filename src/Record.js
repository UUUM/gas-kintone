var Record = function Record(record) {
  if (record) {
    this.setRecord(record);
  } else {
    this.setRecord({});
  }
};

Record.prototype.types = {
  __ID__: '__ID__',
  CHECK_BOX: 'CHECK_BOX',
  CREATED_TIME: 'CREATED_TIME',
  CREATOR: 'CREATOR',
  DATE: 'DATE',
  DATETIME: 'DATETIME',
  DROP_DOWN: 'DROP_DOWN',
  FILE: 'FILE',
  LINK: 'LINK',
  MULTI_LINE_TEXT: 'MULTI_LINE_TEXT',
  MULTI_SELECT: 'MULTI_SELECT',
  MODIFIER: 'MODIFIER',
  NUMBER: 'NUMBER',
  RECORD_NUMBER: 'RECORD_NUMBER',
  RICH_TEXT: 'RICH_TEXT',
  SINGLE_LINE_TEXT: 'SINGLE_LINE_TEXT',
  SUBTABLE: 'SUBTABLE',
  TIME: 'TIME',
  UPDATED_TIME: 'UPDATED_TIME',
  USER_SELECT: 'USER_SELECT'
};

Record.prototype.get = function get(key) {
  if (!this.record[key]) {
    return void 0;
  }
  return this.record[key];
};

Record.prototype.getType = function getType(key) {
  var column = this.get(key);
  if (!column) {
    return void 0;
  }
  return column.type;
};

Record.prototype.getValue = function getValue(key) {
  var column = this.get(key);
  if (!column) {
    return void 0;
  }
  return column.value;
};

Record.prototype.has = function has(key) {
  return this.record.hasOwnProperty(key) && this.record[key].hasOwnProperty('value');
};

Record.prototype.set = function set(key, type, value) {
  if (type) {
    this.setType(type);
  }

  if (value) {
    this.setValue(value);
  }

  return this;
};

Record.prototype.setType = function setType(key, type) {
  if (!this.types.hasOwnProperty(type)) {
    throw new Error('Kintone record column type was wrong');
  }

  if (!this.record[key]) {
    this.record[key] = {};
  }

  this.record[key].type = type;

  return this;
};

Record.prototype.setRecord = function setRecord(record) {
  if (!record || !Obj.isObject(record)) {
    throw new Error('record must be an object');
  }

  this.record = record;
  return this;
};

Record.prototype.setValue = function setValue(key, value) {
  if (!this.record[key]) {
    this.record[key] = {};
  }

  this.record[key].value = value;

  return this;
};

Record.prototype.toObject = function toObject() {
  return this.record;
};
