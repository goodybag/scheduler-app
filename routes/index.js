var express = require('express');
var router = express.Router();

var m = require('../middleware');

router.get('/'
, m.getJobs
, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
