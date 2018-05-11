const {injectBabelPlugin} = require('react-app-rewired');
const rewireMobX = require('react-app-rewire-mobx');
const rewireLess = require('react-app-rewire-less');

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireLess(config, env);
  config = rewireMobX(config, env);
  config = injectBabelPlugin([
    'import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css'
    }
  ], config);
  return config;
}