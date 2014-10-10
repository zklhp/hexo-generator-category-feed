# Feed generator

カテゴリー毎のAtom 1.0かRss 2.0のFeedを作成するプラグインです。

[hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed)を参考にしました。

## Install

``` bash
$ cd ${お好きなディレクトリ}
$ git clone gitlab@gitlab.sv.infra:kosuge/hexo-generator-category-feed.git
$ cd ${導入したいblogのトップディレクトリ}
$ npm install ${hexo-generator-category-feedの絶対パス}
```

## Options

`_config.yml`に以下の設定を追加してください。

``` yaml
feed:
    type: atom
    path: atom.xml
    limit: 20
```

- **type** - Feed type. (atom/rss2)
- **path** - Feed path. (Default: atom.xml/rss2.xml)
- **limit** - Maximum number of posts in the feed (Use `0` or `false` to show all posts)
