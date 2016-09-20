'use strict';

import Ship from './../ship';

import ship_01 from './destroyer_01.gif';
import ship_02 from './destroyer_02.gif';

export default class Destroyer extends Ship {

  ships() {
    return [
      ship_01,
      ship_02
    ];
  }
}