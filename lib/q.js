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

  q.create(action, data).delay(delay).save(callback);
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

/*
*  move jobs in active state to inactive
*/

q.enqueueActiveJobs = function () {
  q.client.zrange('q:jobs:active', 0, -1, function (error, ids) {
    if (error) return console.log(error)

    var tasks = ids.map(function (id) {
      return function (next) {
        kue.Job.get(id, function (error, job) {
          if (error) return next(error);

          // re-enqueue active jobs
          return job.state('inactive', next);
        });
      }
    });

    var done = function (error) {
      if (error) console.log(error);
    }

    async.parallel(tasks, done)
  });
};

module.exports = q;
