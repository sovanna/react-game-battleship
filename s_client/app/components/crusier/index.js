'use strict';

import Ship from './../ship';

import ship_01 from './crusier_01.gif';
import ship_02 from './crusier_02.gif';
import ship_03 from './crusier_03.gif';

export default class Crusier extends Ship {

  ships() {
    return [
      ship_01,
      ship_02,
      ship_03
    ];
  }
}