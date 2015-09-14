var config = require('../config');
var q = require('./q');
var buildPDF = require('build-pdf');
var uploadToS3 = require('upload-to-s3');

q.process(buildPDF.name, config.limit, function (job, done) {
  setTimeout(function () {
    buildPDF.fn(job, done);
  }, config.timeout);
});

q.process('build-pdf:upload-to-s3', function (job, done) {
  buildPDF.fn(job.data.pdf, function () {
    uploadToS3.fn(job.data.s3, done);
  });
});
