'use strict';

import React from 'react';

import { render } from 'react-dom';

import Zone from './components/zone';
import Grid from './components/grid';

class GameBattleShip extends React.Component {

  static get propTypes() {
    return {
      fireFromHumanX: React.PropTypes.number,
      fireFromHumanY: React.PropTypes.number,
      fireFromAlienX: React.PropTypes.number,
      fireFromAlienY: React.PropTypes.number
    };
  }

  static get defaultProp() {
    return {
      fireFromHumanX: null,
      fireFromHumanY: null,
      fireFromAlienX: null,
      fireFromAlienY: null
    };
  }

  constructor(props) {
    super(props);

    this._size = 30;

    this.handleOnClickFireAlien = this.handleOnClickFireAlien.bind(this);
    this.handleOnClickFireHuman = this.handleOnClickFireHuman.bind(this);

    this.state = {
      fireFromHumanX: null,
      fireFromHumanY: null,
      fireFromAlienX: null,
      fireFromAlienY: null
    };
  }

  handleOnClickFireAlien(event, data) {
    this.setState({
      fireFromHumanX: data.x,
      fireFromHumanY: data.y,
      fireFromAlienX: null,
      fireFromAlienY: null
    });
  }

  handleOnClickFireHuman(event, data) {
    this.setState({
      fireFromAlienX: data.x,
      fireFromAlienY: data.y,
      fireFromHumanX: null,
      fireFromHumanY: null
    });
  }

  render() {
    const _style = {
      zone: {
        display: 'inline-block',
        float: 'left',
        padding: '10px'
      }
    };

    return (
      <div>

        {/* HUMAN */}
        <div style={_style.zone}>
          <h2>{`Human`}</h2>
          <Zone
              key={1}
              squarePx={this._size}
              fireX={this.state.fireFromAlienX}
              fireY={this.state.fireFromAlienY}
          />
          <br />
          <p>{`Select and click below to fire to `}<strong>{`Alien`}</strong>{` territory`}</p>
          <Grid
              key={3}
              squarePx={this._size}
              onClick={this.handleOnClickFireAlien}
          />
        </div>


        {/* ALIEN */}
        <div style={_style.zone}>
          <h2>{`Alien`}</h2>
          <Zone
              key={2}
              squarePx={this._size}
              fireX={this.state.fireFromHumanX}
              fireY={this.state.fireFromHumanY}
          />
          <br />

          <p>{`Select and click below to fire to `}<strong>{`Human`}</strong>{` territory`}</p>
          <Grid
              key={4}
              squarePx={this._size}
              onClick={this.handleOnClickFireHuman}
          />
        </div>
      </div>
    );
  }
}

render((
  <div>
    <GameBattleShip />
  </div>
), document.getElementById('app'));