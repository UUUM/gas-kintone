var Record = function Record(record) {
  if (record) {
    this.setRecord(record);
  } else {
    this.setRecord({});
  }
};

Record.prototype.types = {
  __ID__: '__ID__',
  __REVISION__: '__REVISION__',
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

Record.prototype.castValue = function castValue(column) {
  switch (column.type) {
  case '__ID__':
  case '__REVISION__':
  case 'RECORD_NUMBER':
    if (!Obj.isNumber(column.value)) {
      column.value = parseInt(column.value, 10);
    }
    break;

  case 'DATE':
  case 'DATETIME':
  case 'CREATED_TIME':
  case 'UPDATED_TIME':
    if (!(column.value instanceof Date)) {
      column.value = new Date(column.value);
    }
    break;

  case 'NUMBER':
    if (!Obj.isNumber(column.value)) {
      column.value = parseFloat(column.value);
    }
    break;

  default:
    break;
  }

  return column.value;
};

Record.prototype.get = function get(key) {
  var column = this.record[key];

  if (!column) {
    return void 0;
  }

  if (column.value) {
    this.castValue(column);
  }

  return column;
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

Record.prototype.remove = function remove(key) {
  delete this.record[key];
};

Record.prototype.set = function set(key, type, value) {
  if (type) {
    this.setType(key, type);
  }

  if (value) {
    this.setValue(key, value);
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
  var object = {};

  for (var key in this.record) {
    if (!this.record.hasOwnProperty(key)) {
      continue;
    }

    var column = this.get(key);
    if (!column) {
      continue;
    }

    object[key] = {};
    if (column.type) {
      object[key].type = column.type;
    }
    if (column.value) {
      object[key].value = column.value;
    }
  }

  return object;
};
