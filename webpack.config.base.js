const webpack = require('webpack');
const VENDORS = require('./vendors.js');

module.exports = {
    context: __dirname,
    entry: {
        app: ['./app/app.jsx'],
        vendors: VENDORS
    },
    output: {
        path: __dirname + '/public/js',
        publicPath: '/js/',
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ],
    resolve: {
        alias: {
            root: __dirname + '/app'
        },
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: [
            'app/',
            'node_modules'
        ]
    },
    stats: {
        colors: true,
        modules: true,
        reasons: true
    }
};
