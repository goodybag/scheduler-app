var forky = require('forky');

module.exports = function () {
  forky({path: __dirname + '/worker.js'});
};
