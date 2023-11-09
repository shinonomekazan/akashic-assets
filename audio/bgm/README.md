# BGM

BGM（バックグラウンドミュージック）です。ゲーム内音楽としてご利用ください。

## 提供素材

|タイトル|m4a|ogg|備考|
|----|----|---|---|
|RPGエンディング|[〇](./m4a/RPGエンディング.m4a)|[〇](./ogg/RPGエンディング.ogg)||
|RPGオープニング|[〇](./m4a/RPGオープニング.m4a)|[〇](./ogg/RPGオープニング.ogg)||
|RPGバトル|[〇](./m4a/RPGバトル.m4a)|[〇](./ogg/RPGバトル.ogg)||
|RPGフィールド|[〇](./m4a/RPGフィールド.m4a)|[〇](./ogg/RPGフィールド.ogg)||
|RPGボス戦|[〇](./m4a/RPGボス戦.m4a)|[〇](./ogg/RPGボス戦.ogg)||
|RPG町|[〇](./m4a/RPG町.m4a)|[〇](./ogg/RPG町.ogg)||

ファイル名はあくまでもイメージなので、お好きな場面でご利用ください。

## 参考

m4aを先に用意し、libvorbisがある状態のffmpegをインストールした環境のWSL2等で、以下のように実行すれば、oggファイルを一括用意可能。

```sh
ls m4a/*.m4a | xargs -i basename {} .m4a | xargs -i ffmpeg -i m4a/{}.m4a -acodec libvorbis ogg/{}.ogg
```
