const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');

const config = Object.create(baseConfig);

config.entry.app.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000');

config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
    })
);

config.module.loaders.unshift({
    test: /\.jsx?$/,
    loader: 'react-hot',
    exclude: /node_modules/
});

config.devtool = 'source-map';

module.exports = config;
