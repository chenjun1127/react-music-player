const path = require('path');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动生成build文件夹及文件：
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // devtool: 'eval-source-map',
    mode: 'production',
    entry: {
        app: './app/index.js'
    },
    output: {
        path: path.resolve('dist'),
        filename: 'js/[name].[hash:5].js',
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css", ".scss"],
    },
    optimization: {
        minimize: true,
        splitChunks: {
            // include all types of chunks
            chunks: 'all'
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
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },
    plugins: [
        // webpack 内置的 banner-plugin
        new webpack.BannerPlugin("Copyright by https://github.com/chenjun1127"),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'test',
            template: './templates/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ]
}