var ejs = require('ejs');
var pathFn = require('path');
var fs = require('fs');

ejs.filters.cdata = function(str){
  return str ? '<![CDATA[' + str + ']]>' : '';
};

var atomTmplSrc = pathFn.join(__dirname, '../atom.ejs');
var atomTmpl = ejs.compile(fs.readFileSync(atomTmplSrc, 'utf8'));
var rss2TmplSrc = pathFn.join(__dirname, '../rss2.ejs');
var rss2Tmpl = ejs.compile(fs.readFileSync(rss2TmplSrc, 'utf8'));

module.exports = function(locals){
  var config = this.config;
  var feedConfig = config.category_feed;
  var template = feedConfig.type === 'rss2' ? rss2Tmpl : atomTmpl;

  var posts = locals.posts.sort('-date');
  var items = {};

  posts.each(function(post){
    post.categories.each(function(category){
      var categoryName = category.name;
      if (items[categoryName] === undefined){
        items[categoryName] = [];
      }
      items[categoryName].push(post);
    });
  });
  
  var results = [];
  for (var key in items) {
    var categoryPath = config.root + config.category_dir + '/' + key + '/' + feedConfig.path;
    if (feedConfig.limit) {
      items[key].length = feedConfig.limit;
    }
    
    var xml = template({
      config: config,
      posts: items[key],
      feed_url: categoryPath
    });
    results.push({
      path: categoryPath,
      data: xml
    });
  }

  return results;
};
