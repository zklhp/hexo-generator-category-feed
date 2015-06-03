# Feed generator

Generate Feed for each category separately with Hexo 3.x compatible.

## Install

``` bash
$ cd /path/to/blog/node_modules
$ git clone git@github.com:zklhp/hexo-generator-category-feed.git
$ cd /path/to/blog/
$ npm install /path/to/blog/node_modules/hexo-generator-category-feed
```

## Options

You can configure this plugin in `_config.yml`.

``` yaml
feed:
    type: atom
    path: atom.xml
    limit: 20
```

- **type** - Feed type. (atom/rss2)
- **path** - Feed path. (Default: atom.xml/rss2.xml)
- **limit** - Maximum number of posts in the feed (Use `0` or `false` to show all posts)
