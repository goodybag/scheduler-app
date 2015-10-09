var _ = require('lodash');

var utils = _.extend({}, _);

utils.accept = function (obj, values) {
  var o = {};
  for (var k in obj) {
    if (values.indexOf(k) > -1) o[k] = obj[k];
  }
  return o;
};

module.exports = utils;
