'use strict';

import React from 'react';

export default class Square extends React.Component {

  static get propTypes() {
    return {
      positionX: React.PropTypes.number.isRequired,
      positionY: React.PropTypes.number.isRequired,
      size: React.PropTypes.number.isRequired,
      onClick: React.PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(event) {
    this.props.onClick(event, {
      x: this.props.positionX,
      y: this.props.positionY
    });
  }

  render() {
    const _style = {
      position: 'absolute',
      border: '1px solid #777',
      left: `${this.props.positionX * this.props.size}px`,
      top: `${this.props.positionY * this.props.size}px`,
      width: `${this.props.size}px`,
      height: `${this.props.size}px`,
      cursor: 'pointer',
      zIndex: '0'
    };

    return (
      <div style={_style} onClick={this.handleOnClick}>

      </div>
    );
  }
}