'use strict';

import Ship from './../ship';

import ship_01 from './carrier_01.gif';
import ship_02 from './carrier_02.gif';
import ship_03 from './carrier_03.gif';
import ship_04 from './carrier_04.gif';
import ship_05 from './carrier_05.gif';

export default class Carrier extends Ship {

  ships() {
    return [
      ship_01,
      ship_02,
      ship_03,
      ship_04,
      ship_05
    ];
  }
}