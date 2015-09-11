var assert = require('assert');
var q = require('../lib/q');

before(function () {
  q.testMode.enter();
});

afterEach(function () {
  q.testMode.clear();
});

after(function () {
  q.testMode.exit();
});


it('should enqueue jobs', function () {
  var jobData = { foo: 'bar' };
  var jobs = q.testMode.jobs;

  q.create('build-pdf', jobData).save();
  q.create('build-pdf', jobData).save();

  assert.equal(jobs.length, 2, 'jobs length')
  assert.equal(jobs[0].type, 'build-pdf', 'jobs type');
  assert.equal(jobs[0].data, jobData, 'jobs data');
});

it('.enqueue()', function () {
  var jobs = q.testMode.jobs;

  q.enqueue('build-pdf', new Date(), { foo: 'bar' });

  assert.equal(jobs.length, 1, 'jobs length')
});

it('.series()', function (done) {
  q.series([
    {
      action: 'build-pdf',
      data: {
        url: 'http://localhost:8080',
        output: 'foo',
        email: 'foo@test.com',
        password: 'bar'
      }
    },
    {
    action: 'upload-to-s3',
    data: {
      src: 'foo',
      dest: '/bar',
      bucket: 'baz'
      }
    }
  ], function (error, results) {
    assert(!error);
    done();
  });
});
