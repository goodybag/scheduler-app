var kue = require('kue');
var q = require('./lib');


console.log('starting scheduler');
q.start();

console.log('starting kue server on port 8080...');
kue.app.listen(8080);
