var kue = require('kue');
var config = require('../config');
var async = require('async');
var moment = require('moment');

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

  var delay = moment(datetime).unix() - moment().unix();

  q.create(action, {
    action: action
  , data: data
  , datetime: datetime
  }).delay(delay).save(callback);
};

/**
 * Run multiple jobs one after another
 *
 * @param  {Array} jobs An array of job objects
 */

q.series = function (actions, callback) {
  var tasks = actions.map(function (action) {
    return function (next) {
      q.enqueue(action.action, new Date(), action.data, next);
    }
  });
  async.series(tasks, callback);
};

module.exports = q;

