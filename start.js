'use strict';

const _ = require('underscore');
const fse = require('fs-extra');
const async = require('async');
const mkdirp = require('mkdirp');
const swig = require('swig');
const path = require('path');
const cmd_args = require('command-line-args');

const _opts_def = [
  {
    name: 'app',
    alias: 'a',
    type: String,
    multiple: true
  }, {
    name: 'port',
    alias: 'p',
    multiple: true,
    type: Number
  }
];

let _global_opts = cmd_args(_opts_def);

const _check_opts_args = (pOpts, pPortStart) => {
  if (!pOpts) {
    return false;
  }

  if (!_.keys(pOpts).length) {
    console.error('no arg specified');
    return false;
  }

  if (!pOpts.app) {
    console.error('no app defined, app option is mandatory!');
    return false;
  }

  if (pOpts.app && !pOpts.port) {
    pOpts.port = [];

    _.each(pOpts.app, () => {
      pOpts.port.push(pPortStart);
      pPortStart++;
    });
  } else {
    _.each(pOpts.app, (app, i) => {
      if (!pOpts.port[i]) {
        pOpts.port[i] = pPortStart;
        pPortStart++;
      }
    });
  }

  return pOpts;
};

const _remove_re_init = () => {
  fse.removeSync('s_server');
  fse.removeSync('s_client');
}

const _compiled_webpack_conf_template = () => {
  return swig.compileFile(
    path.join(__dirname, 's_client/webpack/conf_dev_x.html')
  );
};

const _create_chimera_server_files = (callback) => {
  const _paths = [
    's_server/templates',
    's_server/static/locales'
  ];

  const _create = (path, callback) => {
    mkdirp(path, (err) => {
      callback(err);
    });
  };

  const _create_chimera_locale_en = (callback) => {
    const _file_path = path.join(__dirname, 's_server/static/locales/en.json');
    const _file_content = {};

    fse.writeJson(_file_path, _file_content, (err) => {
      if (err) {
        callback(err);
      }

      callback(null);
    });
  };

  async.each(_paths, _create, (err) => {
    if (err) {
      return callback(err);
    }

    _create_chimera_locale_en((err) => {
      callback(err);
    });
  });
};

const _copy_templates = (callback) => {
  fse.copy('_templates/', './', callback);
};

const _create_webpack_app_config = (callback) => {
  const _apps = _global_opts.app;
  const _ports = _global_opts.port;

  const _create = (app, callback) => {
    const _file_name = `conf_dev_${app}.js`;

    const _payload = {
      port: _ports[_apps.indexOf(app)],
      name: app
    };

    fse.writeFile(
      path.join(__dirname, 's_client/webpack', _file_name),
      _compiled_webpack_conf_template()(_payload),
      callback
    );
  };

  async.each(_apps, _create, callback);
};

const _create_folder_client_app = (callback) => {
  const _apps = _global_opts.app;

  const _create = (app, callback) => {
    mkdirp(`s_client/${app}`, callback);
  };

  async.each(_apps, _create, callback);
};

const _copy_template_client_to_folder_client = (callback) => {
  const _apps = _global_opts.app;

  const _create = (app, callback) => {
    fse.copy('s_client/x', `s_client/${app}`, callback);
  };

  async.each(_apps, _create, callback);
};

const _remove_folder_client_template = (callback) => {
  const _file_path = path.join(__dirname, 's_client/webpack/conf_dev_x.html');
  fse.remove(_file_path, callback);
};

const _remove_folder_client_x = (callback) => {
  fse.remove(path.join(__dirname, 's_client/x/'), callback);
};

_global_opts = _check_opts_args(_global_opts, 7001);

if (!_global_opts) {
  return;
}

_remove_re_init();

async.series([
  _create_chimera_server_files,
  _copy_templates,
  _create_webpack_app_config,
  _create_folder_client_app,
  _copy_template_client_to_folder_client,
  _remove_folder_client_template,
  _remove_folder_client_x
], (err) => {
  if (err) {
    return console.error(err);
  }

  console.log('start successfully');
});