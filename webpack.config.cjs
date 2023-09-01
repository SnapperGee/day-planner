const resolvePath = require('path').resolve;
const webpack = require('webpack');

module.exports = {
  entry: './src/main/js/script.mjs',
  output: {
    filename: 'index.mjs',
    path: resolvePath(__dirname, 'build'),
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};
