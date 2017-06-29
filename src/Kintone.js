var Kintone = function Kintone(subdomain, appId, apiToken, basicAuth) {
  this.client = new KintoneClient(subdomain, appId, apiToken, basicAuth);
  this.lastResponse = null;
};

Kintone.prototype.formGet = function formGet() {
  var response = this.lastResponse = this.client.fetchGet('form');
  if (response.getResponseCode() !== 200) {
    return new KintoneError(response);
  }
  return response.getBody().properties;
};

Kintone.prototype.getAllRecords = function getAllRecords(fromId) {
  var id = fromId ? fromId : 0;
  var query = '$id >= ' + id + ' order by $id asc';
  return this.recordsGet(query);
};

Kintone.prototype.getFieldCodes = function getFieldCodes() {
  var properties = this.formGet();
  if (properties instanceof KintoneError) {
    return properties;
  }

  var codes = [];
  for (var i = 0; i < properties.length; i++) {
    codes.push(properties[i].code);
  }
  return codes;
};

Kintone.prototype.recordCreate = function recordCreate(record) {
  var response = this.lastResponse = this.client.fetchPost('record', {record: this.toApiRecord(record)});
  if (response.getResponseCode() !== 200) {
    return new KintoneError(response);
  }

  return parseInt(response.getBody().id, 10);
};

Kintone.prototype.recordDelete = function recordDelete(id) {
  var response = this.lastResponse = this.client.fetchDelete('records', {ids: [id]});
  if (response.getResponseCode() !== 200) {
    return new KintoneError(response);
  }
  return true;
};

Kintone.prototype.recordGet = function recordGet(id) {
  var response = this.lastResponse = this.client.fetchGet('record', {id: id});
  if (response.getResponseCode() !== 200) {
    return new KintoneError(response);
  }
  return this.toRecord(response.getBody().record);
};

Kintone.prototype.recordUpdate = function recordUpdate(id, record) {
  var response = this.lastResponse = this.client.fetchPut('record', {id: id, record: this.toApiRecord(record)});
  if (response.getResponseCode() !== 200) {
    return new KintoneError(response);
  }

  return parseInt(response.getBody().revision, 10);
};

Kintone.prototype.recordsCreate = function recordsCreate(records) {
  var recordsParam = [];
  for (var i = 0; i < records.length; i++) {
    recordsParam.push(this.toApiRecord(records[i]));
  }

  var response = this.lastResponse = this.client.fetchPost('records', {records: recordsParam});
  if (response.getResponseCode() !== 200) {
    return new KintoneError(response);
  }

  var ids = response.getBody().ids;
  for (i = 0; i < ids.length; i++) {
    ids[i] = parseInt(ids[i], 10);
  }
  return ids;
};

Kintone.prototype.recordsDelete = function recordsDelete(ids) {
  var response = this.lastResponse = this.client.fetchDelete('records', {ids: ids});
  if (response.getResponseCode() !== 200) {
    return new KintoneError(response);
  }
  return true;
};

Kintone.prototype.recordsGet = function recordsGet(query, fields) {
  var params = {totalCount: true};
  if (query) {
    params.query = query;
  }
  if (fields) {
    params.fields = fields;
  }

  var response = this.lastResponse = this.client.fetchGet('records', params);
  if (response.getResponseCode() !== 200) {
    return new KintoneError(response);
  }

  var result = [];
  var records = response.getBody().records;
  for (var i = 0; i < records.length; i++) {
    result.push(this.toRecord(records[i]));
  }
  return result;
};

Kintone.prototype.recordsUpdate = function recordsUpdate(records) {
  var recordsParam = [];
  for (var i = 0; i < records.length; i++) {
    var record = records[i];
    var id = record.id;
    delete record.id;
    var param = {
      id: id,
      record: this.toApiRecord(record)
    };
    recordsParam.push(param);
  }

  var response = this.lastResponse = this.client.fetchPut('records', {records: recordsParam});
  if (response.getResponseCode() !== 200) {
    return new KintoneError(response);
  }

  var result = response.getBody().records;
  for (i = 0; i < result.length; i++) {
    result[i].id = parseInt(result[i].id, 10);
    result[i].revision = parseInt(result[i].revision, 10);
  }
  return result;
};

Kintone.prototype.toApiRecord = function toApiRecord(record) {
  var apiRecord = {};
  for (var key in record) {
    if (!record.hasOwnProperty(key)) {
      continue;
    }
    apiRecord[key] = {value: record[key]};
  }
  return apiRecord;
};

Kintone.prototype.toRecord = function toApiRecord(apiRecord) {
  var record = {};
  for (var key in apiRecord) {
    if (!apiRecord.hasOwnProperty(key)) {
      continue;
    }
    switch (key) {
    case 'id':
    case '$id':
    case 'revision':
    case '$revision':
      record[key] = parseInt(apiRecord[key].value, 10);
      break;
    default:
      record[key] = apiRecord[key].value;
      break;
    }
  }
  return record;
};
