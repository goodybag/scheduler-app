import React from 'react';
import moment from 'moment';

export default class JobItem extends React.Component {
  constructor (props) {
    super(props);

    this.state = props.job;
  }

  toggleInfo (e) {
    this.refs.moreInfo.classList.toggle('hide');
  }

  render () {

    var moreInfo = (function () {
      return (
        <dl className="more-info-list">
        {Object.keys(this.state).map( (key, i) => {
          let value = this.state[key];

          return (
            <div key={i}>
              <dt>{key}</dt>
              <dd>
                {typeof value === "object"? JSON.stringify(value) : value}
              </dd>
            </div>
          );
        })}
        </dl>
      );
    }.bind(this))();

    return (
      <div className="job-item" onClick={this.toggleInfo.bind(this)}>
        <div className="job-info">
          {this.state.id} <span className="action">{this.state.action}</span>
          <span className="job-datetime">{moment(this.state.datetime).fromNow()}</span>
        </div>
        <div ref="moreInfo" className="hide">
          {moreInfo}
        </div>
      </div>
    );
  }
}