var generator = hexo.extend.generator;

if (generator.register.length === 1){
  generator.register(require('./category_feed'));
} else {
  generator.register('category_feed', require('./category_feed'));
}