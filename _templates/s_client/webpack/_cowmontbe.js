'use strict';

const chalk = require('chalk');
const cowsay = require('cowsay');

const _consts = require('./_consts');

module.exports = (afterCow) => {

  const _cow_text = `Welcome to ${_consts.pkg.name} \
    v${_consts.pkg.version} by \
    ${_consts.pkg.author}`;

  const _cow_after = chalk.cyan(`\n\n\
    ${_consts.pkg.name} \
    ${_consts.animal.toUpperCase()}: `) + chalk.green('Ready!');

  console.log(cowsay.say({
    text: _cow_text,
    f: _consts.animal,
    w: 60
  }));

  afterCow(() => {
    console.log(_cow_after);
  });
};
