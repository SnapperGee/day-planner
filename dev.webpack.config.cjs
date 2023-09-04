const resolvePath = require('path').resolve;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {entry: [resolvePath('.', 'src', 'main', 'ts', 'script.ts'), resolvePath('.', 'src', 'main', 'scss', 'index.scss')],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[a|c]ss$/,
        use: ['style-loader','css-loader', 'sass-loader']
     }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.mjs',
    path: resolvePath(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolvePath('.', 'src', 'main', 'html', 'index.html')
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};
