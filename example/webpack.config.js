const createExpoWebpackConfigAsync = require('@expo/webpack-config')
const fs = require('fs')
const path = require('path')
const packages = path.resolve(__dirname, "..", "packages")

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv)

  config.module.rules.push({
    test: /\.(js|ts|tsx)$/,
    include:  /(packages|example)\/.+/,
    exclude: /node_modules/,
    use: 'babel-loader',
  });

  config.resolve.alias['react-native$'] = 'react-native-web'

  fs.readdirSync(packages).forEach((dirname) => {
    const pak = require(`../packages/${dirname}/package.json`);
    config.resolve.alias[pak.name] = path.resolve(packages, dirname, 'src')
  })

  return config
}