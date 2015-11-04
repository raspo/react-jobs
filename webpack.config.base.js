const webpack = require('webpack');
const EXTERNALS = require('./externals.js');

module.exports = {
    context: __dirname,
    entry: {
        app: ['./app/app.jsx'],
        vendors: EXTERNALS
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
                exclude: /node_modules/,
                query: {
                    optional: ['es7.decorators', 'es7.classProperties']
                }
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
