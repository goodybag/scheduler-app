var forky = require('forky');
var config = require('../config')

module.exports = function () {
  forky({path: __dirname + '/worker.js', workers: config.workers});
};
