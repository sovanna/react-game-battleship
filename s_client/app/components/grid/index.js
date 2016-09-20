'use strict';

import React from 'react';

import Square from './../square';

export default class Grid extends React.Component {

  static get propTypes() {
    return {
      size: React.PropTypes.number,
      squarePx: React.PropTypes.number,
      ships: React.PropTypes.array.isRequired,
      onClick: React.PropTypes.func
    };
  }

  static get defaultProps() {
    return {
      size: 10,
      squarePx: 50,
      ships: []
    };
  }

  constructor(props) {
    super(props);

    this._grid = [];

    this.handleOnClick = this.handleOnClick.bind(this);

    this._build();
  }

  handleOnClick(event, data) {
    if (this.props.onClick) {
      this.props.onClick(event, data);
    }

    return false;
  }

  _build() {
    let _x_axis;
    let _index = 0;

    this._grid = [];

    for (let i = 0; i < this.props.size; i++) {
      _x_axis = [];

      for (let j = 0; j < this.props.size; j++) {
        _x_axis.push({
          x: j,
          y: i,
          index: _index
        });

        _index++;
      }

      this._grid.push(_x_axis);
    }
  }

  render() {
    return (
      <div
          style={{
            position: 'relative',
            width: `${this.props.size * this.props.squarePx}px`,
            height: `${this.props.size * this.props.squarePx}px`
          }}
      >
        {this.props.ships.map((ship, key) => {
          return (
            <div key={key}>
              {ship}
            </div>
          );
        })}

        {this._grid.map((y_axis) => {
          return (y_axis.map((x_axis) => {
            return (
              <Square
                  key={x_axis.index}
                  positionX={x_axis.x}
                  positionY={x_axis.y}
                  size={this.props.squarePx}
                  onClick={this.handleOnClick}
              />
            );
          }));
        })}
      </div>
    );
  }
}