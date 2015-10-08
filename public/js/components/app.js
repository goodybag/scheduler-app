import React from 'react';
import JobNav from './job-nav.js';
import JobList from './job-list.js';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      jobs: props.jobs || []
    }
  }

  render () {
    return (
      <div>
        <JobNav />
        <JobList jobs={this.state.jobs} />
      </div>
    );
  }
}