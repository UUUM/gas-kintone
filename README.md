# Google Apps Script Kintone Library

Google Apps Script 用の Kintone ライブラリです。

# 使い方

## ライブラリとして追加する

使いたい Google Apps Script のプロジェクトにライブラリとして追加するだけで使えます。
ライブラリの追加方法( https://developers.google.com/apps-script/guide_libraries )

```
Script ID: 1-Dlw6bRJOH65e2XwrimFwwFn9vHMa5m1PS6E_2_kMcC99Hxm1Nm7nFkt
```

# 開発環境構築

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
