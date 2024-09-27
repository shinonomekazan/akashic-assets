# BGM

BGM（バックグラウンドミュージック）です。ゲーム内音楽としてご利用ください。

## 提供素材

|タイトル|m4a|ogg|備考|
|----|----|---|---|
|RPGエンディング|[〇](./m4a/RPG-ending.m4a)|[〇](./ogg/RPG-ending.ogg)||
|RPGオープニング|[〇](./m4a/RPG-opening.m4a)|[〇](./ogg/RPG-opening.ogg)||
|RPGバトル|[〇](./m4a/RPG-battle.m4a)|[〇](./ogg/RPG-battle.ogg)||
|RPGフィールド|[〇](./m4a/RPG-field.m4a)|[〇](./ogg/RPG-field.ogg)||
|RPGボス戦|[〇](./m4a/RPG-boss.m4a)|[〇](./ogg/RPG-boss.ogg)||
|RPG町|[〇](./m4a/RPG-town.m4a)|[〇](./ogg/RPG-town.ogg)||
|RPGダンジョン|[〇](./m4a/RPG-dungeon.m4a)|[〇](./ogg/RPG-dungeon.ogg)||

ファイル名はあくまでもイメージなので、お好きな場面でご利用ください。

## 参考

m4aを先に用意し、libvorbisがある状態のffmpegをインストールした環境のWSL2等で、以下のように実行すれば、oggファイルを一括用意可能。

```sh
ls m4a/*.m4a | xargs -i basename {} .m4a | xargs -i ffmpeg -i m4a/{}.m4a -acodec libvorbis ogg/{}.ogg
```
