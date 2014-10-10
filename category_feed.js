// 必要なModuleのrequire
var ejs = require('ejs'),
  merge = require('utils-merge'),
  path = require('path'),
  file = hexo.util.file2;

ejs.filters.cdata = function(str) {
  return '<![CDATA[' + (str || '') + ']]>';
};

// atomテンプレートの作成
var atomTmplSrc = path.join(__dirname, 'atom.ejs');
var atomTmpl = ejs.compile(file.readFileSync(atomTmplSrc));

// rss2テンプレートの作成
var rss2TmplSrc = path.join(__dirname, 'rss2.ejs');
var rss2Tmpl = ejs.compile(file.readFileSync(rss2TmplSrc));

// 実行処理
module.exports = function(locals, render, callback) {
  var config = hexo.config;
  var feedConfig = merge({
    type: 'atom',
    limit: 20
  }, config.feed);

  if (feedConfig.type !== 'atom' && feedConfig.type !== 'rss2') {
    feedConfig.type = 'atom';
  }

  if (!feedConfig.path) {
    feedConfig.path = feedConfig.type + '.xml';
  }

  if (!path.extname(feedConfig.path)) {
    feedConfig.path += '.xml';
  }

  if (feedConfig.type === 'rss2') {
    var template = rss2Tmpl;
  } else {
    var template = atomTmpl;
  }

  var posts = locals.posts.sort('date', -1);
  var items = {};
  posts.each(function(post){
    post.categories.each(function(category){
      var categoryName = category.name;
      if (items[categoryName] === undefined) {
        items[categoryName] = [];
      }
      items[categoryName].push(post);
    });
  });

  for (var key in items) {
    var categoryXMLPath = config.root + 'categories/' + key + '/' + feedConfig.path;
    if (feedConfig.limit) {
      items[key].length = feedConfig.limit;
    }
    var xml = template({
      config: config,
      posts: items[key],
      feed_url: categoryXMLPath
    });
    hexo.route.set(categoryXMLPath, xml);
  }

  callback();
}
