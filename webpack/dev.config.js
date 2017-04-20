const base = require('./base.config');

const LiveReloadPlugin = require('webpack-livereload-plugin');

const config = Object.assign({}, base, {

  devtool: 'source-map',

});

config.plugins.push(
  new LiveReloadPlugin()
);

module.exports = config;