import React from 'react';

export default class JobNav extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      options: ['pending', 'completed', 'failed', 'in-progress']
    };
  }

  render () {
    return (
      <nav className="job-nav">
        <ol>
        {this.state.options.map((opt, i) => <li key={i}>{opt}</li>)}
        </ol>
      </nav>
    );
  }
}