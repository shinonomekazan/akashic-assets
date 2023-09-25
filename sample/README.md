# akashic-assets-sample

**akashic-assets-sample**は [akashic-assets-sample]()を用いた[akashic-assets]のサンプルです。

## 利用方法

`akashic-assets-sample` を利用するには Node.js が必要です。

初回のみ、以下のコマンドを実行して、ビルドに必要なパッケージをインストールしてください。

```sh
npm install
```

### ビルド方法

`akashic-assets-sample` は TypeScript で書かれているため、以下のコマンドで JavaScript ファイルに変換する必要があります。

```sh
npm run build
```

`src` ディレクトリ以下の TypeScript ファイルがコンパイルされ、`script` ディレクトリ以下に JavaScript ファイルが生成されます。

`watch` を行う事で、ファイルの変更を見て自動更新をすることもできます。

```sh
npm run watch
```

画像やサウンド等の更新をする場合、 `image` や `audio` のフォルダのファイルを更新した後、以下のコマンドを実行してください。

```sh
npm run update
```

### 動作確認方法

以下を実行後、ブラウザで `http://localhost:3000/game/` にアクセスすることでゲームを実行できます。

- `npm start`

マルチプレーのゲームを制作する場合、以下のコマンドでサーバを起動する事ができます。起動後、ブラウザで `http://localhost:3300` にアクセスすると、ゲームを実行できます。

- `npm run akashic serve`

テストを書く事もできます。 `spec` フォルダに記述したテストは、以下のコマンドで実行してください。

- `npm test`

## LICENSE

[MIT License](./LICENSE)
