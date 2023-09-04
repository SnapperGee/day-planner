import { resolve as resolvePath } from "node:path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default function(env, argv) {
    return {
        entry: [resolvePath('.', 'src', 'main', 'ts', 'script.ts'), resolvePath('.', 'src', 'main', 'scss', 'index.scss')],
        mode: env.production ? 'production' : 'development',
        devtool: env.production ? 'source-map' : 'eval-source-map',
        module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: { configFile: resolvePath('.', 'config', env.production ? 'tsconfig.dist.json' : 'tsconfig.dev.json') }
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.s[a|c]ss$/,
                use: [env.production ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader']
            }
        ],
        },
        resolve: { extensions: ['.tsx', '.ts', '.js'], },
        output: {
            filename: env.production ? 'index.min.mjs' : 'index.mjs',
            path: resolvePath('.', 'build'),
        },
        plugins: [
            new MiniCssExtractPlugin({ filename: "index.min.css" }),
            new HtmlWebpackPlugin({
                template: resolvePath('.', 'src', 'main', 'html', 'index.html')
            }),
            new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" })
        ]
    }
};
