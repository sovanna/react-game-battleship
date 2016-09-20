'use strict';

import Ship from './../ship';

import ship_01 from './submarine_01.gif';

export default class Carrier extends Ship {

  ships() {
    return [
      ship_01
    ];
  }
}