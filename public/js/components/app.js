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
    }
  }

  componentDidMount() {
    this.fetchJobs('pending')
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
        this.forceUpdate();

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