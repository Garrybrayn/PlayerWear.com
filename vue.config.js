const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const childProcess = require('child_process');


const ArbitraryCodeAfterReload = function() {
  this.apply = function(compiler) {
    if (compiler.hooks && compiler.hooks.done) {
      compiler.hooks.done.tap('done', function(clik) {
        let appFileName;
        let runtimeFile;
        const tags = Array
          .from(clik.compilation.assetsInfo.keys())
          .filter(filename => filename.includes('.js'))
          .map(filename => {
            if(filename.includes('app.')){
              appFileName = filename;
            }
            if(filename.includes('runtime.')){
              runtimeFile = filename;
            }
            return `<script src="{{ '${filename.replace('js/','')}' | asset_url }}" async></script>`;
          })

        // console.log('COPYING APP')
        // childProcess.execSync(`cp -r ./dist/${appFileName} ./src/assets/${appFileName}`);
        if(runtimeFile){
          childProcess.execSync(`cp -r ./dist/${runtimeFile} ./src/assets/${runtimeFile}`);
        }
        console.log('COPYING DEPS')
        childProcess.execSync(`cp -r ./dist/js/* ./src/assets`);

        console.log('UPDATING THEME FILE CONTENTS');
        const fileContents = fs.readFileSync('./dist/theme.template.liquid', {encoding:'utf8'});
        const newFileContents = fileContents.replace('{{ webpack_scripts }}', tags.join("\n"));
        fs.writeFileSync("./src/layout/theme.liquid", newFileContents);

      });
    }
  };
};

module.exports = {
  configureWebpack: {
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash:8].js',
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
      new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
      new ArbitraryCodeAfterReload(),
    ],
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace('@', '')}`;
            },
          },
        },
      },
    },
  }
};
