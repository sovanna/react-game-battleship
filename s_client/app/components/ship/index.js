'use strict';

import React from 'react';

import stylesLocal from './styles.less';

export default class Ship extends React.Component {

  static get propTypes() {
    return {
      orientation: React.PropTypes.string,
      size: React.PropTypes.number,
      positionX: React.PropTypes.number,
      positionY: React.PropTypes.number
    };
  }

  static get defaultProps() {
    return {
      orientation: 'portrait',
      size: 50
    }
  }

  ships() {
    return [];
  }

  render() {
    let _orientation = this.props.orientation;
    let _style_ship = {};
    let _style_li;
    let _style_img;

    const _style = {
      liPortrait: {
        width: `${this.props.size}px`,
        height: `${this.props.size}px`
      },

      liLandscape: {
        display: 'inline',
        listStyleType: 'none',
        width: `${this.props.size}px`,
        height: `${this.props.size}px`
      },

      imgPortrait: {
        width: `${this.props.size}px`,
        height: `${this.props.size}px`
      },

      imgLandscape: {
        width: `${this.props.size}px`,
        height: `${this.props.size}px`,
        WebkitTransform: 'rotate(-90deg)',
        MozTransform: 'rotate(-90deg)',
        OTransform: 'rotate(-90deg)',
        MsTransform: 'rotate(-90deg)',
        transform: 'rotate(-90deg)'
      }
    };

    if (_orientation !== 'portrait' && _orientation !== 'landscape') {
      _orientation = 'portrait';
    }

    _style_li = _orientation === 'portrait' ? _style.liPortrait : _style.liLandscape;
    _style_img = _orientation === 'portrait' ? _style.imgPortrait : _style.imgLandscape;

    if (this.props.positionX) {
      _style_ship.left = `${this.props.positionX * this.props.size}px`;
    }

    if (this.props.positionY) {
      _style_ship.top = `${this.props.positionY * this.props.size}px`;
    }

    return (
      <div className={stylesLocal.battleship}>
        <ul style={_style_ship}>
          {this.ships().map((ship, key) => {
            return (
              <li key={key} style={_style_li}>
                <img style={_style_img} src={ship} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}