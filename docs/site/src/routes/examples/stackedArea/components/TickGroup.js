// @flow weak

import React, { Component, PropTypes } from 'react';
import withManagedData from 'material-charts/withManagedData';
import Tick from './Tick';

const ManagedTicks = withManagedData(Tick);

export default class TickGroup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ticks: [],
      xScale0: null,
      xScale1: null,
    };
  }

  componentDidMount() {
    const { props } = this;
    this.update(props, props);
  }

  componentWillReceiveProps(next) {
    const { props } = this;
    if (props.xScale !== next.xScale) {
      this.update(next, props);
    }
  }

  update({ xScale }, props) {
    this.setState({
      ticks: xScale.ticks(),
      xScale0: props.xScale,
      xScale1: xScale,
    });
  }

  render() {
    const { state: { ticks, xScale0, xScale1 }, props: { duration, yScale } } = this;

    return (
      <ManagedTicks
        data={ticks}
        xScale0={xScale0}
        xScale1={xScale1}
        yHeight={yScale.range()[1]}
        duration={duration}
      />
    );
  }
}

TickGroup.propTypes = {
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
};