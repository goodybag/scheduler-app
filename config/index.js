module.exports = {
  redis: require('./redis')
, workers: 6        // # of cpus
, limit: 10          // default concurrency for all jobs
, timeout: 10*1000  // run jobs every 10 seconds
};
