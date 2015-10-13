#!/usr/bin/env node

/*
* Detects if this module was installed from
* npm or a git repo
*/

var config = require('../package.json');
var exec = require('child_process').exec;

if (sourceType(config) === 'github') {
  exec('npm install --dev --ignore-scripts', function (error) {
    if (error) {
      console.log('ERROR: unable to source install scheduler-app', error);
      return process.exit(1);
    }

    var cmd = process.argv[2];

    exec(cmd, function (error) {
      if (error) {
        console.log('ERROR: unable execute command', cmd, error);
        return process.exit(1);
      }
      process.exit(0);
    });
  });
} else {
  process.exit(0);
}

/*
* get package.json source type
*/

function sourceType ( config ) {
  if (!config._resolved) return 'unknown';

  return ({
    'https': 'npm'
  , 'git+https': 'github'
  })[config._resolved.split(':')[0]];
}