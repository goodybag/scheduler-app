import React from 'react';
import JobItem from './job-item.js';

export default class JobList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      jobs: props.jobs || []
    };
  }

  render () {
    let jobs = this.state.jobs.map((job, i) => <JobItem key={i} job={job} />);

    return (
      <div>
      {jobs}
      </div>
    )
  }
}
