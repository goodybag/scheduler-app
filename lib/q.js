var kue = require('kue');
var config = require('../config');

var q = kue.createQueue({
  prefix: 'q',
  redis: config.redis
});

/*  Shim legacy scheduler API */

/**
 * Scheules a new job
 *
 * @param {string}   action
 * @param {Date}     datetime to run job by
 * @param {object}   data for consumers
 * @param {function} callback(err, result)
 */
q.enqueue = function (action, datetime, data, predicateId, callback) {
  if (typeof action !== 'string') {
    callback && callback('Invalid actions type: ' + typeof action);
    return;
  }

  if (typeof predicateId === 'function') {
    callback = predicateId;
    predicateId = null;
  }

  q.create(action, {
    action: action
  , data: data
  , datetime: datetime
  }).save(callback);
};

/**
 * Run multiple jobs one after another
 *
 * @param  {Array} jobs An array of job objects
 */

q.series = function (list, callback) {

};

module.exports = q;

