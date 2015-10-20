const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');

const config = Object.create(baseConfig);

config.plugins.push(
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compressor: {
            screw_ie8: true,
            warnings: false
        },
        sourceMap: false
    })
);

module.exports = config;
