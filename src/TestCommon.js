var TestCommon = function TestCommon() {
  var properties = PropertiesService.getScriptProperties();

  this.subdomain = properties.getProperty('KintoneTestSubdomain');
  this.appId = parseInt(properties.getProperty('KintoneTestAppId'), 10);
  this.apiToken = properties.getProperty('KintoneTestApiToken');

  var basicUser = properties.getProperty('KintoneTestBasicAuthUser');
  var basicPass = properties.getProperty('KintoneTestBasicAuthPass');
  if (basicUser) {
    this.basicAuth = [basicUser, basicPass];
  } else {
    this.basicAuth = null;
  }
};

TestCommon.prototype.createRecord = function createRecord() {
  return new Record({
    '文字列__1行': {
      'type': 'SINGLE_LINE_TEXT',
      'value': 'テスト'
    },
    '文字列__複数行': {
      'type': 'MULTI_LINE_TEXT',
      'value': 'テスト\nテスト2'
    },
    'リッチエディター': {
      'type': 'RICH_TEXT',
      'value': '<span style=\'color: rgb(0,0,255);\'>テスト</span>'
    },
    '$id': {
      'type': '__ID__',
      'value': '1'
    },
    '$revision': {
      'type': '__REVISION__',
      'value': '7'
    },
    '日付': {
      'type': 'DATE',
      'value': '2014-02-16'
    },
    '数値': {
      'type': 'NUMBER',
      'value': '20'
    },
    'Table': {
      'type': 'SUBTABLE',
      'value': [{
        'id': '33347',
        'value': {
          'ルックアップ': {
            'type': 'SINGLE_LINE_TEXT',
            'value': ''
          },
          'テーブル文字列': {
            'type': 'SINGLE_LINE_TEXT',
            'value': 'テスト'
          },
          'テーブル数値': {
            'type': 'NUMBER',
            'value': '1000'
          }
        }
      }, {
        'id': '33354',
        'value': {
          'ルックアップ': {
            'type': 'SINGLE_LINE_TEXT',
            'value': ''
          },
          'テーブル文字列': {
            'type': 'SINGLE_LINE_TEXT',
            'value': 'テスト2'
          },
          'テーブル数値': {
            'type': 'NUMBER',
            'value': '2000'
          }
        }
      }]
    },
    '日時': {
      'type': 'DATETIME',
      'value': '2014-02-16T08:57:00Z'
    },
    'ユーザー選択': {
      'type': 'USER_SELECT',
      'value': [{
        'code': 'sato',
        'name': '佐藤　昇'
      }]
    },
    '時刻': {
      'type': 'TIME',
      'value': '17:57'
    },
    '作成日時': {
      'type': 'CREATED_TIME',
      'value': '2014-02-16T08:59:00Z'
    },
    'チェックボックス': {
      'type': 'CHECK_BOX',
      'value': [
        'sample1',
        'sample2'
      ]
    },
    '複数選択': {
      'type': 'MULTI_SELECT',
      'value': [
        'sample1',
        'sample2'
      ]
    },
    '更新日時': {
      'type': 'UPDATED_TIME',
      'value': '2014-02-17T02:35:00Z'
    },
    '作成者': {
      'type': 'CREATOR',
      'value': {
        'code': 'sato',
        'name': '佐藤　昇'
      }
    },
    '更新者': {
      'type': 'MODIFIER',
      'value': {
        'code': 'sato',
        'name': '佐藤　昇'
      }
    },
    'レコード番号': {
      'type': 'RECORD_NUMBER',
      'value': '1'
    },
    'ドロップダウン': {
      'type': 'DROP_DOWN',
      'value': 'sample2'
    },
    'リンク_ウェブ': {
      'type': 'LINK',
      'value': 'https://www.cybozu.com'
    },
    '添付ファイル': {
      'type': 'FILE',
      'value': [{
        'contentType': 'image/png',
        'fileKey': '20140216085901A05579B4196F4968AE26262EE889BD58086',
        'name': '2014-01-30_No-0001.png',
        'size': '30536'
      }]
    }
  });
};

TestCommon.prototype.getApi = function getApi() {
  if (this.api) {
    return this.api;
  }

  this.api = new Api(this.getClient());
  return this.api;
};

TestCommon.prototype.getClient = function getClient() {
  if (this.client) {
    return this.client;
  }

  this.client = new Client(this.subdomain, this.appId, this.apiToken, this.basicAuth);
  return this.client;
};

TestCommon.prototype.getErrorResponse = function getErrorResponse() {
  if (this.errorResponse) {
    return this.errorResponse;
  }

  var client = this.getClient();
  var url = client.getApiUrl('record');
  this.errorResponse = new Response(UrlFetchApp.fetch(url, client.option));
  return this.errorResponse;
};

TestCommon.prototype.getKintone = function getKintone() {
  if (this.kintone) {
    return this.kintone;
  }

  this.kintone = new Kintone(this.subdomain, this.appId, this.apiToken, this.basicAuth);
  return this.kintone;
};

TestCommon.prototype.setup = function setup() {
  return true;
};
