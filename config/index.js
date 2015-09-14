module.exports = {
  redis: require('./redis')
, workers: 4        // # of cpus
, limit: 1          // default concurrency for all jobs
, timeout: 10*1000  // run jobs every 10 seconds
};
