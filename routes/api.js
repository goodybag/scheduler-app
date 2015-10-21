var express = require('express');
var utils = require('../utils');
var router = express.Router();
var pgquery = require('../lib/query');

/*
* GET /api/scheduler
*/

router.get('/jobs', function(req, res) {

  var query = {
    type: 'select'
  , table: 'scheduled_jobs'
  , where: {
      status: req.query.status || 'pending'
    }
  , limit: 50
  , order: { id: 'desc' }
  };

  pgquery(query, function (error, results) {
    if (error) return res.status(500).json(error);
    res.json(results);
  });
});

/*
* GET /api/scheduler/:job_id
*/

router.get('/jobs/:job_id', function(req, res) {

  var query = {
    type: 'select'
  , table: 'scheduled_jobs'
  , where: {
      id: req.params.job_id
    }
  };

  pgquery(query, function (error, results) {
    if (error) return res.status(500).json(error);
    res.json(results);
  });
});

/*
* PUT /api/scheduler/:job_id
*/

router.put('/jobs/:job_id', function(req, res) {

  var query = {
    type: 'update'
  , table: 'scheduled_jobs'
  , where: {
      id: req.params.job_id
    }
  };

  query.values = utils.accept(utils.extend(req.query, req.body), ['status']);

  pgquery(query, function (error, results) {
    if (error) return res.status(500).json(error);
    res.json(results);
  });
});

module.exports = router;