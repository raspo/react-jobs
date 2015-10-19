var webpack = require("webpack");

module.exports = {
    context: __dirname,
    entry: [
        './public/js/app.jsx'
    ],
    output: {
        path: __dirname + '/public/dist',
        publicPath: '/dist/',
        filename: 'bundle.js'
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
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: [
            'public/js/',
            'node_modules'
        ]
    },
    stats: {
        colors: true,
        modules: true,
        reasons: true,
    }
};