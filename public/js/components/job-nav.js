import React from 'react';

export default class JobNav extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <nav className="job-nav">
        <ol>
        {this.props.statuses.map((status, i) => {
          return (
            <li
              key={i}
              className={status === this.props.active ? 'active': ''}
              onClick={this.props.fetchJobs.bind(this, status)}
              >{status}</li>
          )
        })}
        </ol>
      </nav>
    );
  }
}