import { resolve as resolvePath, dirname } from "node:path";
import { fileURLToPath } from 'url';
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

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
                use: ['style-loader','css-loader', 'sass-loader']
            }
        ],
    },
    resolve: { extensions: ['.tsx', '.ts', '.js'], },
    output: {
        filename: 'index.mjs',
        path: resolvePath(__dirname, '..', 'build'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolvePath('.', 'src', 'main', 'html', 'index.html')
        }),
        new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" })
    ]
};
