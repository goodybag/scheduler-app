var kue = require('kue');
var config = require('../config');

module.exports = kue.createQueue({
  prefix: 'q',
  redis: config.redis
});

