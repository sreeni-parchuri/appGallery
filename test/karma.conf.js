var path = require('path'),
    projectPath = path.resolve(__dirname, '../'),
    masterConf = require(path.join(projectPath, 'node_modules/frontier-build-tools/test/fskarma10-config'));
module.exports = function (config) {
  masterConf(config, {
    browsers: ["PhantomJS"],
    projectPath: projectPath,
    logLevel: 'LOG_DEBUG',
    testFiles: [
      'node_modules/expect.js/expect.js',
      'node_modules/sinon/pkg/sinon-1.10.3.js',
      'assets/js/modules/vendorCommon/assembly.json',
      'node_modules/theme-engage/vendor/angularjs/js/angular-1.2.9/angular-mocks.js',
      'vendor/lodash/js/lodash.js',
      'node_modules/underscore.string/lib/underscore.string.js',
      'assets/js/modules/*.js',
      'assets/js/modules/**/assembly.json',
      'assets/js/angular/ErrorMsg/assembly.json',
      'assets/js/angular/batch/assembly.json',
      'assets/js/angular/**/assembly.json',
      'node_modules/fs-image-viewer/assets/js/lib/*.js',

      {pattern: 'assets/js/angular/**/test/*Test.js', watched: true, included: true, served: true}
    ]
  });
};