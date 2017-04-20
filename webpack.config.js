const args = require('minimist')(process.argv.slice(2));

let env = 'prod';
if(args.watch) {
  env = 'dev';
}

const getConfig = (env) => {
  return require('./webpack/' + env + '.config');
}

module.exports = getConfig(env);