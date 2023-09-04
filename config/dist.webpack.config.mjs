import { resolve as resolvePath, dirname } from "node:path";
import { fileURLToPath } from 'url';
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
    entry: [resolvePath(__dirname, '..', 'src', 'main', 'ts', 'script.ts'), resolvePath(__dirname, '..', 'src', 'main', 'scss', 'index.scss')],
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
    resolve: { extensions: ['.tsx', '.ts', '.js'], },
    output: {
        filename: 'index.min.mjs',
        path: resolvePath(__dirname, '..', 'build'),
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "index.min.css" }),
        new HtmlWebpackPlugin({
            template: resolvePath('.', 'src', 'main', 'html', 'index.html')
        }),
        new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" })
    ]
};
