const resolvePath = require('path').resolve;
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [resolvePath('.', 'src', 'main', 'ts', 'script.ts'), resolvePath('.', 'src', 'main', 'scss', 'index.scss')],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[a|c]ss$/,
        use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader']
     }
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
     new MiniCssExtractPlugin({
      filename: "index.min.css"
     }),
    new HtmlWebpackPlugin({
      filename: "index.min.html",
      template: resolvePath('.', 'src', 'main', 'html', 'index.html')
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};
