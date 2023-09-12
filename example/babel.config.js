const path = require('path')
const pak = require('../package.json');

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    "plugins": [
      [
        "module-resolver", {
          alias: {
            '@rneui/components': path.resolve(
              __dirname,
              '..',
              'packages/components/src'
            ),
            '@rneui/theme': path.resolve(
              __dirname,
              '..',
              'packages/theme/src'
            )
          }
        }
      ]
    ]
  };
};
