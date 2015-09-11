var CronJob = require('cron').CronJob;

var job = new CronJob({
  cronTime: '*/10 * * * * *'
, onTick: require('./tick')
, start: false
});

job.start();