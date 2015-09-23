module.exports = {
  redis: require('./redis')
, workers: 2        // # of cpus
, limit: 4          // default concurrency for all jobs
, timeout: 10*1000  // run jobs every 10 seconds
};
