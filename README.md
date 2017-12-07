# Google Apps Script Kintone Library

Google Apps Script 用の Kintone ライブラリです。

# インストール

使いたい Google Apps Script のプロジェクトにライブラリとして追加するだけで使えます。
ライブラリの追加方法( https://developers.google.com/apps-script/guide_libraries )

```
Script ID: 1-Dlw6bRJOH65e2XwrimFwwFn9vHMa5m1PS6E_2_kMcC99Hxm1Nm7nFkt
```

# 対応API

自分で必要な機能だけ実装したので、全てのAPIには対応できていませんが、通常の CRUD 操作ぐらいでは特に問題ないかと思います。
対応しているAPIは次のものになります。

* [レコードの取得(GET)](https://developer.cybozu.io/hc/ja/articles/202331474)
* [レコードの登録(POST)](https://developer.cybozu.io/hc/ja/articles/202166160)
* [レコードの更新(PUT)](https://developer.cybozu.io/hc/ja/articles/201941784)
* [レコードの取得(GET)](https://developer.cybozu.io/hc/ja/articles/201941794)
* [フォーム設計情報取得](https://developer.cybozu.io/hc/ja/articles/201941834)


# 使い方

`Kintone` クラスを new してメソッド呼び出すだけです。
`Kintone` クラスには、サブドメイン、アプリケーションID、APIキーを渡します。

```
var kintone = KintoneLib.Kintone('subdomain', 1, 'xxxx');
```

## 共通仕様

APIエラーが発生すると、 `KintoneError` クラスが返ってきます。
返ってきたオブジェクトが `KintoneError` かどうかで判定をしてください。

```
var record = kintone.recordGet(1);
if (record instanceof KintoneLib.KintoneError) {
  alert(record.response.getResponseCode());
  alert(record.id);
  alert(record.code);
  alert(record.message);
}
```

## レコードの取得(GET)

### レコードの取得(1件)

レコードIDを指定して、レコードを1件取得します。

```
var record = kintone.recordGet(1);
```

### レコードの一括取得(クエリで条件を指定)

クエリで条件を指定して、一括でレコードを取得します。
取得するフィールドの指定もできます。
クエリ、フィールド共に省略可能です。

```
var records;

// 全件取得(Kintoneで最大200件の制限有り)
records = kintone.recordsGet();

// id が100以上のレコードを取得
records = kintone.recordsGet('$id >= 100');

// id が100以上のレコードの id の値のみ取得
records = kintone.recordsGet('$id >= 100',  ['$id']);
```

## レコードの登録(POST)

### レコードの登録（1件）

連想配列で指定されたレコードを新規作成します。
新しく追加されたレコードのIDが返ってきます。

```
var id = kintone.recordCreate({columnName: 'value'});
```

### レコードの一括登録

レコードの配列を渡して、複数レコードを一括登録します。
新しく追加されたレコードのIDの配列が返ってきます。

```
var ids = kintone.recordsCreate([
  {columnName: 'value1'},
  {columnName: 'value2'}
]);
```

## レコードの更新(PUT)

### レコードの更新(1件)

指定されたIDのレコードを指定された値で更新します。
更新されたレコードのリビジョンが返ってきます。

```
var revision = kintone.recordUpdate(1, {columnName: 'value'});
```

### レコードの一括更新

更新するレコードの配列を渡して一括更新します。
各レコードには、必ず `id` が存在する必要があります。

成功すると、各レコードの id, revision の配列が返ってきます。

```
var records = kintone.recordsUpdate([
  {id: 1, columnName: 'value1'},
  {id: 2, columnName: 'value2'}
]);
```

## レコード削除(DELETE)

### レコード削除(1件)

指定されたIDのレコードを削除します。
成功すると true を返します。

```
var result = kintone.recordDelete(1);
```

### レコードの一括削除

IDの配列を渡して、指定した複数のレコードを一括削除します。
成功すると true を返します。

```
var result = kintone.recordDelete([1, 2]);
```

# 開発環境構築

自分で開発環境を構築したい方は、下記を参考にしてみてください。

## submodule の追加

```
git submodule init
git submodule update
```

## node ライブラリのインストール

```
npm install
```

## Google Apps Script のプロジェクトを作る

Google Drive で任意の Google Apps Script のファイルを作ります。

`Code.gs` を `testRunner.gs` に名前を変更します。
この作業をしないと testRunner.gs が先に読み込まれず、テストが失敗します。

## gapps.config.json を作る

gapps.config.json.sample を gapps.config.json にコピーします。
`fileId` を先程作った Google Apps Script の Id に変更します。

```
cp gapps.config.json.sample gapps.config.json
vim
```

## API Key を作る

Google Drive API を有効にした API Key を Google Developer Console で作成します。
API Key を作ったら、 `client_secret.json` をダウンロードしてトップディレクトリに置きます。

## 認証

```
npm run auth
```

URL が表示されるので、そこにアクセスして自分のアカウントで認証します。
これで自分のアカウントの権限で Google Drive へのアクセス権を付与することができるようになります。

~/.gapps に認証情報が保存されます。

client_secret.json はもういらないので削除します。

```
rm client_secret.json
```

## ディプロイ

ディプロイできるかどうか確認します。

```
npm run deploy
```

# テスト用 Kintone アプリ

## アプリを作る

KintoneLib のテスト用の適当な Kintone アプリを作成します。

フォームに `文字列(1行)` のカラムを追加します。
フィールドコードを `one_line_text` に変更します。

## APIトークンの生成

APIトークンを生成します。
全ての権限を付与してください。

## Kintone アプリの設定を Google Apps Script に追加

Google Apps Script の `Project properties` に次の項目を追加します。

```
KintoneTestApiToken: さっき作った Kintone の APIトークン
KintoneTestAppId: Kintone テストアプリの id
```

# 開発の進め方

## コードチェック

eslint でコードのチェックをしています。
定期的にチェックをして、エラーが出ないように修正します。

```
npm run check
```

## ユニットテスト

[GasT](https://github.com/zixia/gast)を使ってテストプログラムを書いています。
ディプロイ後に Google Apps Script で `testRunner` を実行してください。
テスト結果は、ログに出力されます。
