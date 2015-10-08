import React from 'react';

export default class JobItem extends React.Component {
  constructor (props) {
    super(props);

    this.state = props.job;
  }

  toggleInfo (e) {
    this.refs.moreInfo.classList.toggle('hide');
  }

  render () {
    return (
      <div>
        <p onClick={this.toggleInfo.bind(this)}>#{this.state.id} {this.state.action}</p>
        <div ref="moreInfo" className="hide">
          <p>status {this.state.status}</p>
          <p>data {JSON.stringify(this.state.data)}</p>
          <p>datetime {this.state.datetime}</p>
        </div>
        <hr />
      </div>
    );
  }
}