var q = require('./q');
var actions = require('actions');

var limit = 4

module.exports = function () {
  console.log('building pdf..');

  q.process('build-pdf', limit, actions[0].fn);
};
