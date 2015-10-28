import React from 'react';
import JobNav from './job-nav.js';
import JobList from './job-list.js';
import request from 'superagent';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      jobs: []
    , statuses: ['pending', 'completed', 'failed', 'in-progress']
    , active: 'pending'
    , interval: 1000
    }
  }

  componentDidMount() {
    this.fetchJobs('pending');
    this.pollJobs();
  }

  componentDidUnmount() {
    clearInterval(this.iv);
  }

  pollJobs () {
    this.iv = setInterval(function () {
      this.fetchJobs(this.state.active);
    }.bind(this), this.state.interval);
  }

  fetchJobs (status) {
    request
      .get('/api/jobs?status=' + status)
      .end(function (err, res) {
        if (err) {
          return console.error(err);
        }

        this.setState({
          jobs: res.body
        , active: status
        });

      }.bind(this));
  }

  render () {
    return (
      <div>
        <JobNav statuses={this.state.statuses} active={this.state.active} fetchJobs={this.fetchJobs.bind(this)}/>
        <JobList jobs={this.state.jobs} />
      </div>
    );
  }
}