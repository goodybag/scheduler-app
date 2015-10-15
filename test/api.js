var request = require('supertest');
var app = require('../app')();

describe('GET /api/jobs', function(){
  it('respond with json', function(done){
    request(app)
      .get('/api/jobs')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
})

describe('GET /api/jobs/:job_id', function(){
  it('respond with json', function(done){
    request(app)
      .get('/api/jobs/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
})

describe('PUT /api/jobs/:job_id', function(){
  it('respond with json', function(done){
    request(app)
      .put('/api/jobs/531916')
      .send({ status: 'completed' })
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
})
