const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const packageJson = JSON.parse(fs.readFileSync('./package.json'));

module.exports = {
  entry: {
    content: './app/content/main.js',
    background: './app/background/main.js',
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]/bundle.js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'es2015', 'stage-2'],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.jpg|\.gif|\.png$/,
        loader: 'file-loader',
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin([{ from: './app/icons', to: 'icons' }]),
    new CopyWebpackPlugin([
      {
        from: './app/manifest.json',
        to: 'manifest.json',
        transform: function(content) {
          const newContent = content.toString();
          return newContent.replace(
            /{{packageJson.version}}/g,
            packageJson.version
          );
        },
      },
    ]),
  ],
};
