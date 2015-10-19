var webpack = require("webpack");

module.exports = {
    context: __dirname,
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './public/js/app.jsx'
    ],
    output: {
        path: __dirname + '/public/dist',
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'react-hot',
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/
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
    },
    devtool: 'source-map'
};
