var config = require('../config');
var q = require('./q');
var buildPDF = require('build-pdf');

q.process(buildPDF.name, config.limit, function (job, done) {
  setTimeout(function () {
    buildPDF.fn(job, done);
  }, config.timeout);
});
