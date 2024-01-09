# BGM

BGM（バックグラウンドミュージック）です。ゲーム内音楽としてご利用ください。

## 提供素材

|タイトル|m4a|ogg|備考|
|----|----|---|---|
|RPGエンディング|[〇](./m4a/RPGエンティンク.m4a)|[〇](./ogg/RPGエンティンク.ogg)||
|RPGオープニング|[〇](./m4a/RPGオーフニンク.m4a)|[〇](./ogg/RPGオーフニンク.ogg)||
|RPGバトル|[〇](./m4a/RPGハトル.m4a)|[〇](./ogg/RPGハトル.ogg)||
|RPGフィールド|[〇](./m4a/RPGフィールト.m4a)|[〇](./ogg/RPGフィールト.ogg)||
|RPGボス戦|[〇](./m4a/RPGホス戦.m4a)|[〇](./ogg/RPGホス戦.ogg)||
|RPG町|[〇](./m4a/RPG町.m4a)|[〇](./ogg/RPG町.ogg)||
|RPGダンジョン|[〇](./m4a/RPGタンション.m4a)|[〇](./ogg/RPGタンション.ogg)||

ファイル名はあくまでもイメージなので、お好きな場面でご利用ください。

## 参考

m4aを先に用意し、libvorbisがある状態のffmpegをインストールした環境のWSL2等で、以下のように実行すれば、oggファイルを一括用意可能。

```sh
ls m4a/*.m4a | xargs -i basename {} .m4a | xargs -i ffmpeg -i m4a/{}.m4a -acodec libvorbis ogg/{}.ogg
```
