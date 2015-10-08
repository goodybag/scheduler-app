var express = require('express');
var router = express.Router();

router.get('/scheduler', function(req, res) {
    var pgquery = req.app.get('query');

  var query = {
    type: 'select'
  , table: 'scheduled_jobs'
  , where: {
      status: 'pending'
    }
  };

  pgquery(query, function (error, results) {
    if (error) return res.status(500).json(error);
    res.json(results);
  });
});

module.exports = router;