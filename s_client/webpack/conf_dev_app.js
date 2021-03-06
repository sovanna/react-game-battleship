'use strict';

const webpack = require('webpack');
const webpack_plugins = require('webpack-load-plugins')();
const path = require('path');
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard();

const _consts = require('./_consts');

const name_app = 'app';
const host = 'localhost';
const port = 7001;
const context_app = path.join(__dirname, '..', name_app);
const context_build = path.join(`${_consts.path_server}/static/${name_app}`);

module.exports = require('./conf_common')({
  __host: host,
  __port: port,
  env: 'development',
  entry: [
    `webpack-dev-server/client?http://${host}:${port}`,
    'webpack/hot/dev-server',
    `./main.js`
  ],
  context: context_app,
  outputPath: context_build,
  publicPath: `http://${host}:${port}/static/${name_app}`,
  modules_loader_css: 'style-loader!css-loader?localIdentName=[path][name]---[local]---[hash:base64:5]&modules&importLoaders=1!postcss-loader',
  modules_loader_img: 'url-loader?limit=10000',
  modules_loader_html: 'html-loader',
  postcss: [
    require('postcss-focus')(),
    require('postcss-cssnext')({
      browsers: [
        'last 2 versions',
        'IE > 10'
      ]
    }),
    require('postcss-reporter')({
      clearMessages: true
    })
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack_plugins.html({
      template: 'index.html',
      inject: true
    }),
    new webpack_plugins.html({
      template: `index.html`,
      filename: `${_consts.path_server_relative}/templates/dev_${name_app}.html`,
      inject: true
    }),
    new webpack_plugins.exportFiles(`${_consts.path_server_relative}/templates/dev_${name_app}.html`),
    new DashboardPlugin(dashboard.setData)
  ]
});
