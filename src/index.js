'use strict';

import React, { Component } from 'react'
import uuid from 'uuid';

const FacebookStyle = (props) => {
  return (
    <Wrap {...props}>
      <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />

      <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
      <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />

      <rect x="0" y="80" rx="3" ry="3" width="350" height="10" />
      <rect x="0" y="100" rx="3" ry="3" width="400" height="10" />
      <rect x="0" y="120" rx="3" ry="3" width="360" height="10" />
    </Wrap>
  );
}

const Wrap = (props) => {

  let idClip = uuid.v1()
  let idGradient = uuid.v1()

  return (
    <svg viewBox={`0 0 400 ${props.height}`} version="1.1" style={props.style} preserveAspectRatio="xMidYMid meet">
      <rect style={{fill: `url(#${idGradient})`}} clipPath={`url(#${idClip})`} x="0" y="0" width="400" height={props.height} />

      <defs>
        <clipPath id={`${idClip}`}>
          { props.children }
        </clipPath>

        <linearGradient id={`${idGradient}`}>
          <stop offset="0%" stopColor={props.primaryColor}>
            <animate attributeName="offset" values="-2; 1" dur={`${props.speed}s`} repeatCount="indefinite" />
          </stop>
          <stop offset="50%" stopColor={props.secondaryColor}>
            <animate attributeName="offset" values="-1.5; 1.5" dur={`${props.speed}s`} repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor={props.primaryColor}>
            <animate attributeName="offset" values="-1; 2" dur={`${props.speed}s`} repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
}


class RcLoader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      style: props.style,
      type: props.type || 'facebook',
      speed: props.speed || 2,
      height: props.height ||130,
      primaryColor: props.primaryColor || '#f0f0f0',
      secondaryColor: props.secondaryColor || '#e0e0e0'
    };
  }

  render() {
    if (this.props.children) {
      return (
        <Wrap {...this.state}>
          { this.props.children }
        </Wrap>
      );
    }

    if (!this.props.children) {
      return <FacebookStyle {...this.state} />;
    }
  }
}

RcLoader.propTypes = {
  style: React.PropTypes.object,
  type: React.PropTypes.string,
  speed: React.PropTypes.number,
  height: React.PropTypes.number,
  primaryColor: React.PropTypes.string,
  secondaryColor: React.PropTypes.string,
}

export default RcLoader
