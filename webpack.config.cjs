const resolvePath = require('path').resolve;
const webpack = require('webpack');

module.exports = {
  // entry: './src/main/js/script.mjs',
  entry: './src/main/ts/script.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.min.mjs',
    path: resolvePath(__dirname, 'build'),
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};
