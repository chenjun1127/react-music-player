const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    // It suppress error shown in console, so it has to be set to false.
    quiet: false,
    hot: true,
    // It suppress everything except error, so it has to be set to false as well
    // to see success build.
    noInfo: false,
    stats: {
        colors: true,
    },
    // proxy: {
    //     '*': {
    //         headers: {
    //             'Cookie': 'appver=4.0.2',
    //             'Referer': 'http://music.163.com',
    //         },
    //         target: 'https://m.y.qq.com/',
    //         secure: false,
    //         changeOrigin: true
    //     }
    // }
}).listen(3000, 'localhost', function (err) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:3000');
});