module.exports = function (req, res, next) {
  var pgquery = req.app.get('query');

  var query = {
    type: 'select'
  , table: 'scheduled_jobs'
  , where: {
      status: 'pending'
    }
  };

  pgquery(query, function (error, results) {
    if (error) return next(error);
    res.locals.jobs = results;
    next();
  });
}