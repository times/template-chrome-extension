const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const base = require('./base.config');
const ZipPlugin = require('zip-webpack-plugin');

const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json')));

const config = Object.assign({}, base, {
  resolve: {
    alias: {
      preact: 'preact/dist/preact.min',
      react: 'preact-compat',
      'react-dom': 'preact-compat'
    }
  }
});

config.plugins.push(
  new ZipPlugin({
    path: path.resolve(__dirname, '../package'),
    filename: `extension-${packageJson.version}.zip`,
  })
);

config.plugins.push(new webpack.optimize.UglifyJsPlugin());

// Push production definition (for React)
config.plugins.push(new webpack.DefinePlugin({
  'process.env':{
    'NODE_ENV': JSON.stringify('production')
  }
}));

module.exports = base;