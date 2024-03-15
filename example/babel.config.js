const path = require('path')
const pak = require('../package.json');

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['react-native-reanimated/plugin'],
      ['@babel/plugin-proposal-export-namespace-from'],
      [
        "module-resolver", {
          alias: {
            '@rneui/components': path.resolve(
              __dirname,
              '..',
              'packages/components/src'
            )
          }
        }
      ]
    ]
  };
};
