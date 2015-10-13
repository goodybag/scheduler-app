var express = require('express');
var utils = require('../utils');
var router = express.Router();

/*
* GET /api/scheduler
*/

router.get('/scheduler', function(req, res) {
  var pgquery = req.app.get('query');

  var prevId = req.query.prev_id;

  var query = {
    type: 'select'
  , table: 'scheduled_jobs'
  , where: {
      status: req.query.status || 'pending'
    }
  , limit: 50
  , order: { id: 'desc' }
  };

  if (prevId) {
    query.where.id = { $lt: prevId };
  }

  pgquery(query, function (error, results) {
    if (error) return res.status(500).json(error);
    res.json(results);
  });
});

/*
* GET /api/scheduler/:job_id
*/

router.get('/scheduler/:job_id', function(req, res) {
  var pgquery = req.app.get('query');

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

router.put('/scheduler/:job_id', function(req, res) {
  var pgquery = req.app.get('query');

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