'use strict';

const path = require('path');

module.exports = {
  pkg: require('./../../package.json'),
  path_server: path.join(`${__dirname}`, '../../s_server'),
  path_server_relative: '../../s_server',
  animal: 'stegosaurus',
  backend_host: 'http://localhost',
  backend_port: 7777
};