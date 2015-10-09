import React from 'react';
import JobItem from './job-item.js';

export default class JobList extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        {this.props.jobs.map((job, i) => <JobItem key={job.id} job={job} />)}
      </div>
    )
  }
}
