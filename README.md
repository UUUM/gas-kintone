# Google Apps Script Kintone Library

Google Apps Script 用の Kintone ライブラリです。

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
