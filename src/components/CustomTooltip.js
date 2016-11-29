import React, { Component } from 'react';

export const CustomTooltip  = React.createClass({
  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;
      console.log(this.props);
      console.log(payload);

      return (
        <div className="custom-tooltip">
          <p className="label">{ payload[0].payload.year }</p>
          <p>{ payload[0].value + ' billion'}</p>
        </div>
      );
    }

    return null;
  }
});
