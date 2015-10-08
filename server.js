var app = require('./app');
var http = require('http');

var server = http.createServer(app());
var port = process.argv[2] || 8000;
server.listen(port);
console.log('listening on port', port);
