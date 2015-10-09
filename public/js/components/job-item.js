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
      var resolveValue = function (value, key) {
        if (typeof value === "object") {
          return JSON.stringify(value);
        } else if (key === 'status') {

          let options = ['pending', 'in-progress', 'completed', 'failed'].map((s, i) => {
            return <option key={i} value={s} selected={value === s}>{s}</option>;
          });

          return (
            <select>
              {options}
            </select>
          );

        } else if (key === 'predicate_id') {
          return <a href={value}>{value}</a>;
        } else {
          return value;
        }
      };

      return (
        <dl className="more-info-list">
        {Object.keys(this.state).map( (key, i) => {
          let value = this.state[key];

          return (
            <div key={i}>
              <dt>{key}</dt>
              <dd>
                {resolveValue(value, key)}
              </dd>
            </div>
          );
        })}
        </dl>
      );
    }.bind(this))();

    return (
      <div className="job-item">

        <div className="job-info" onClick={this.toggleInfo.bind(this)}>
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