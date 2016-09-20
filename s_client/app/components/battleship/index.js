'use strict';

import Ship from './../ship';

import ship_01 from './battleship_01.gif';
import ship_02 from './battleship_02.gif';
import ship_03 from './battleship_03.gif';
import ship_04 from './battleship_04.gif';

export default class BattleShip extends Ship {

  ships() {
    return [
      ship_01,
      ship_02,
      ship_03,
      ship_04
    ];
  }
}