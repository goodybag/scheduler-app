var pg = require('pg');
var builder = require('mongo-sql');

var config = process.env.PG_CONFIG || 'postgres://localhost/cater';

module.exports = function (query, callback) {
  pg.connect(config, function (error, client, done) {
    if (error) return callback(error);

    var q = builder.sql(query).toQuery();

    client.query(q.text, q.values, function (error, results) {
      done();
      results = results ? results.rows : {};
      return callback(error, results);
    });

  });
};
