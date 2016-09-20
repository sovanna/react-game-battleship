'use strict';

import React from 'react';

import Grid from './../grid';
import BattleShip from './../battleship';
import Carrier from './../carrier';
import Cruiser from './../crusier';
import Destroyer from './../destroyer';
import Submarine from './../submarine';

import ImgTargetSinked from './target_sinked.png';

const _ = require('underscore');

const SHIP_TYPE = {
  CARRIER: 'carrier',
  BATTLE_SHIP: 'battleship',
  CRUISER: 'cruiser',
  DESTROYER: 'destroyer',
  SUBMARINE: 'submarine'
};

const SHIP_SIZE = {
  CARRIER: 5,
  BATTLE_SHIP: 4,
  CRUISER: 3,
  DESTROYER: 2,
  SUBMARINE: 1
}

const SHIP_ORIENTATION = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape'
}

export default class Zone extends React.Component {

  static get propTypes() {
    return {
      size: React.PropTypes.number,
      squarePx: React.PropTypes.number,
      fireX: React.PropTypes.number,
      fireY: React.PropTypes.number
    };
  }

  static get defaultProps() {
    return {
      size: 10,
      squarePx: 40
    };
  }

  constructor(props) {
    super(props);

    this._ships = [];

    this.buildShip = this.buildShip.bind(this);
    this.addShip = this.addShip.bind(this);
    this.generatePositionShip = this.generatePositionShip.bind(this);
    this.haveToSink = this.haveToSink.bind(this);

    this._ships = [];

    this.addShip(SHIP_TYPE.CARRIER, this._ships);
    this.addShip(SHIP_TYPE.BATTLE_SHIP, this._ships);
    this.addShip(SHIP_TYPE.CRUISER, this._ships);
    this.addShip(SHIP_TYPE.DESTROYER, this._ships);
    this.addShip(SHIP_TYPE.SUBMARINE, this._ships);

    this.state = {
      sinked: [],
      ships: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fireX !== null && nextProps.fireY !== null) {
      this.haveToSink(null, {
        x: nextProps.fireX,
        y: nextProps.fireY
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps && ((nextProps.fireX !== this.props.fireX) || (nextProps.fireY !== this.props.fireY));
  }

  randomPosition(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  sizeShip(TYPE) {
    switch (TYPE) {
      case SHIP_TYPE.CARRIER:
        return SHIP_SIZE.CARRIER;

      case SHIP_TYPE.BATTLE_SHIP:
        return SHIP_SIZE.BATTLE_SHIP;

      case SHIP_TYPE.CRUISER:
        return SHIP_SIZE.CRUISER;

      case SHIP_TYPE.DESTROYER:
        return SHIP_SIZE.DESTROYER;

      case SHIP_TYPE.SUBMARINE:
        return SHIP_SIZE.SUBMARINE;

      default:
        return 0;
    }
  }

  positionsShip(ship) {
    let _positions = [];

    if (ship.orientation == SHIP_ORIENTATION.PORTRAIT) {
      let _current_index = ship.y;

      for (let i = 1; i <= ship.size; i++) {
        _positions.push({
          x: ship.x,
          y: _current_index++
        });
      }
    } else {
      let _current_index = ship.x;

      for (let i = 1; i <= ship.size; i++) {
        _positions.push({
          x: _current_index++,
          y: ship.y
        });
      }
    }

    return _positions;
  }

  generatePositionShip(TYPE, orientation=this.randomPosition(0, 1)) {
    const _ship_size = this.sizeShip(TYPE);

    if (orientation) {
      return {
        orientation: SHIP_ORIENTATION.PORTRAIT,
        x: this.randomPosition(0, this.props.size - 1),
        y: this.randomPosition(0, this.props.size - _ship_size),
        type: TYPE,
        size: _ship_size
      };
    }

    return {
      orientation: SHIP_ORIENTATION.LANDSCAPE,
      x: this.randomPosition(0, this.props.size - _ship_size),
      y: this.randomPosition(0, this.props.size - 1),
      type: TYPE,
      size: _ship_size
    };
  }

  addShip(TYPE, ships) {
    let _ps_current_ships;
    let _new_ship;
    let _ps_new_ship;

    if (!this._ships.length) {
      return ships.push(this.generatePositionShip(TYPE));
    }

    do {
      _ps_current_ships = _.flatten(_.map(this._ships, (ship) => {
        return this.positionsShip(ship);
      }));

      _new_ship = this.generatePositionShip(TYPE);
      _ps_new_ship = this.positionsShip(_new_ship);
    } while (_.find(_ps_current_ships, (ship) => {
      return _.find(_ps_new_ship, (psns) => {
        return psns.x === ship.x && psns.y === ship.y;
      });
    }));

    return ships.push(_new_ship);
  }

  buildShip(ship, key) {
    switch (ship.type) {
      case SHIP_TYPE.CARRIER:
        return (
          <Carrier
              key={key}
              size={this.props.squarePx}
              positionX={ship.x}
              positionY={ship.y}
              orientation={ship.orientation}
          />
        );

      case SHIP_TYPE.BATTLE_SHIP:
        return (
          <BattleShip
              key={key}
              size={this.props.squarePx}
              positionX={ship.x}
              positionY={ship.y}
              orientation={ship.orientation}
          />
        );

      case SHIP_TYPE.CRUISER:
        return (
          <Cruiser
              key={key}
              size={this.props.squarePx}
              positionX={ship.x}
              positionY={ship.y}
              orientation={ship.orientation}
          />
        );

      case SHIP_TYPE.DESTROYER:
        return (
          <Destroyer
              key={key}
              size={this.props.squarePx}
              positionX={ship.x}
              positionY={ship.y}
              orientation={ship.orientation}
          />
        );

      case SHIP_TYPE.SUBMARINE:
        return (
          <Submarine
              key={key}
              size={this.props.squarePx}
              positionX={ship.x}
              positionY={ship.y}
              orientation={ship.orientation}
          />
        );

      default:
        return null;
    }
  }

  haveToSink(event, data) {
    _.find(this._ships, (ship) => {
      const _positions = this.positionsShip(ship);

      return _.find(_positions, (position) => {
        const _isSink = position.x === data.x && position.y === data.y;

        if (_isSink) {
          if (!_.find(this.state.sinked, (sink) => {
            return sink.x === data.x && sink.y === data.y;
          })) {
            console.log('SINK!!!');

            this.setState({
              sinked: _.uniq([...this.state.sinked, Object.assign({}, ship, data)])
            });
          } else {
            console.log('ALREADY SINK');
          }
        }

        return _isSink;
      });
    })
  }

  render() {
    let _ships = [];

    _.each(this._ships, (ship, key) => {
      _ships.push(this.buildShip(ship, key));
    });

    return (
      <div style={{
        position: 'relative',
        width: `${this.props.size * this.props.squarePx}px`,
        height: `${this.props.size * this.props.squarePx}px`
      }}>

        {this.state.sinked.map((sink, key) => {
          return (
            <img key={key} style={{
              width: `${this.props.squarePx}px`,
              height: `${this.props.squarePx}px`,
              position: 'absolute',
              left: `${this.props.squarePx * sink.x}px`,
              top: `${this.props.squarePx * sink.y}px`,
              zIndex: '2'
            }} src={ImgTargetSinked}
            />
          );
        })}

        <Grid
            size={this.props.size}
            squarePx={this.props.squarePx}
            ships={_ships}
        />
      </div>
    );
  }
}