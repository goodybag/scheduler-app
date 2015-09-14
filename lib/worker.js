var q = require('./q');
var buildPDF = require('build-pdf');

q.process(buildPDF.name, function (job, done) {
  setTimeout(function () {
    buildPDF.fn(job, done);
  }, 10*1000);// process every 10 seconds
});
