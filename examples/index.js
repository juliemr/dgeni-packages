var path = require('canonical-path');
var packagePath = __dirname;

module.exports = function(config) {

  config.append('processing.processors', [
    require('./processors/examples-parse'),
    require('./processors/examples-generate'),
  ]);

  config.set('processing.examples.commonFiles', {
    scripts: [],
    stylesheets: []
  });

  config.prepend('rendering.templateFolders', path.resolve(packagePath, 'templates'));

  return config;
};