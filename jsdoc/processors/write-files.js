var _ = require('lodash');
var path = require('canonical-path');
var log = require('winston');
var Q = require('q');
var writer = require('dgeni/lib/utils/doc-writer');

var outputFolder;

module.exports = {
  name: 'write-files',
  description: 'Write the renderedContent to the outputPath',
  runAfter:['writing-files'],
  runBefore: ['files-written'],
  init: function(config) {
    outputFolder = path.resolve(config.basePath, config.rendering.outputFolder);
  },
  process: function(docs) {
    return Q.all(_.map(docs, function(doc) {

      if ( !doc.outputPath ) {
        console.log(doc);
        log.error('Invalid document "' + doc.id + ', ' + doc.docType + '" - this document has no outputPath.');
      }

      var outputFile = path.resolve(outputFolder, doc.outputPath);

      log.silly('writing file', outputFile);
      return writer.writeFile(outputFile, doc.renderedContent).then(function() {
        log.debug('written file', outputFile);
        return outputFile;
      });
    }));
  }
};