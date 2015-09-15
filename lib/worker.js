var config = require('../config');
var q = require('./q');
var buildPDF = require('build-pdf');
var uploadToS3 = require('upload-to-s3');
var actions = require('actions');

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

q.process('build-pdf:upload-to-s3', function (job, done) {

  // PDF builds can bog down the scheduler, adding an
  // expiration time should prevent builds from halting
  // the queue

  var limit = 10 * 60 * 1000; // time limit 10 minutes

  var expire = setTimeout(function () {
    var msg = 'Job ' + job.id +' exceeded max time limit';
    console.log(msg); // Todo: use goodybag logger
    done(msg);
  }, limit);

  buildPDF.fn(job.data.pdf, function (error) {
    if (error) {
      clearTimeout(expire);
      return done(error);
    }
    uploadToS3.fn(job.data.s3, function (error) {
      clearTimeout(expire);
      done(error);
    });
  });

});
