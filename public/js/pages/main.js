import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import App from '../components/app.js';

request.get('/api/scheduler').end(function (err, jobs) {
  ReactDOM.render(<App jobs={jobs.body} />, document.getElementById('scheduler-app'));
});
