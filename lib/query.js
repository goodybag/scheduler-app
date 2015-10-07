var pg = require('pg');
var builder = require('mongo-sql');

module.exports = function (config) {
  config = config || 'postgres://localhost/cater';

  return function (query, callback) {
    pg.connect(config, function (error, client, done) {
      if (error) return callback(error);

      var q = builder.sql(query).toQuery();

      client.query(q.text, q.values, function (error, results) {
        done();
        return callback(error, results.rows);
      });

    });
  };
};
