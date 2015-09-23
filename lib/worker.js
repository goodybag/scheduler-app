var config = require('../config');
var q = require('./q');
var buildPDF = require('build-pdf');
var uploadToS3 = require('upload-to-s3');
var actions = require('actions');

/*
* Re-enqueue active jobs on startup.
* This is necessary b/c kue will only attempt to process inactive jobs
*/

q.enqueueActiveJobs();

/*
* Register all scheduler actions
*/

actions.forEach(function (action) {
  q.process(action.name, config.limit, function (job, done) {
    setTimeout(function () {
      action.fn(job, done);
    }, config.timeout);
  });
});

/*
* Build PDF than upldate to s3
*/

q.process('build-pdf:upload-to-s3', config.limit, function (job, done) {

  buildPDF.fn(job.data.pdf, function (error) {
    if (error) {
      return done(error);
    }
    uploadToS3.fn(job.data.s3, function (error) {
      done(error);
    });
  });

});
