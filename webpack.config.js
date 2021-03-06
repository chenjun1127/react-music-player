const path = require('path');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    mode: 'development',
    entry: {
        app: './app/index.js'
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css", ".scss"],
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    module: {
        rules: [{
            test: /\.js$/, // babel 转换为兼容性的 js
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            }
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192 // 小于8KB 使用base64格式图片
                }
            }]
        }, {
            test: /\.(css|scss)$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        }, {
            test: /\.(mp3|webm|ogg)/,
            use: {
                loader: 'file-loader',
            }
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            title: 'react-music-player',
            template: './templates/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new OpenBrowserPlugin({ url: 'http://localhost:3000' })
    ]
}