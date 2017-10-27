var Record = function Record(record) {
  if (record) {
    this.setRecord(record);
  } else {
    this.setRecord({});
  }
};

Record.prototype.get = function get(key) {
  if (this.record[key]) {
    return this.record[key];
  }
  return void 0;
};

Record.prototype.getType = function getType(key) {
  return this.get(key).type;
};

Record.prototype.getValue = function getValue(key) {
  return this.get(key).value;
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
  if (!this.record[key]) {
    this.record[key] = {};
  }

  switch (type) {
  case '__ID__':
  case 'CHECK_BOX':
  case 'CREATED_TIME':
  case 'CREATOR':
  case 'DATE':
  case 'DATETIME':
  case 'DROP_DOWN':
  case 'FILE':
  case 'LINK':
  case 'MULTI_LINE_TEXT':
  case 'MULTI_SELECT':
  case 'MODIFIER':
  case 'NUMBER':
  case 'RECORD_NUMBER':
  case 'RICH_TEXT':
  case 'SINGLE_LINE_TEXT':
  case 'SUBTABLE':
  case 'TIME':
  case 'UPDATED_TIME':
  case 'USER_SELECT':
    break;
  default:
    throw new Error('Kintone record column type was wrong');
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
