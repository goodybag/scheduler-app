import React from 'react';
import JobNav from './job-nav.js';
import JobList from './job-list.js';
import request from 'superagent';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      jobs: []
    , limit: 50
    , statuses: ['pending', 'completed', 'failed', 'in-progress']
    , active: 'pending'
    }
  }

  componentDidMount() {
    this.fetchJobs('pending');
    window.onscroll = this.onScroll.bind(this);
  }

  onScroll () {
    var body = document.body;
    var html = document.documentElement;

    var height = Math.max( body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight );

    var pixelsFromBottom = height - window.scrollY - window.innerHeight;

    if (pixelsFromBottom <= 0) {
      //fetch the next set of scheduled jobs
      var status = this.state.active;
      var jobs = this.state.jobs;

      if (jobs.length > this.state.limit - 1) {
        this.fetchJobs(status, jobs[jobs.length - 1].id);
      }

    }
  }

  fetchJobs (status, prevId) {

    var endpoint = '/api/scheduler?status=' + status;

    if (prevId) {
      endpoint += '&prev_id=' + prevId;
    }

    request
      .get(endpoint)
      .end(function (err, res) {
        if (err) {
          return console.error(err);
        }

        this.setState({
          jobs: prevId ? this.state.jobs.concat(res.body) : res.body
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