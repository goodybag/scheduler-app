var request = require('supertest');
var app = require('../app')();

describe('GET /api/scheduler', function(){
  it('respond with json', function(done){
    request(app)
      .get('/api/scheduler')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
})

describe('GET /api/scheduler/:job_id', function(){
  it('respond with json', function(done){
    request(app)
      .get('/api/scheduler/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
})

describe('PUT /api/scheduler/:job_id', function(){
  it('respond with json', function(done){
    request(app)
      .put('/api/scheduler/531916')
      .send({ status: 'completed' })
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
})
