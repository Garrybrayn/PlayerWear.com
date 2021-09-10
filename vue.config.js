// const path = require('path');

module.exports = {
  chainWebpack: config => {
    config.module.rule('eslint').use('eslint-loader').options({
      fix: true
    })
  },
  pluginOptions: {
    ssr: {
      // defaultTitle: 'Player Wear',
      // favicon: './public/favicon.ico',
      // templatePath: path.resolve(__dirname, './dist/index.html.template')
    }
  }
}
