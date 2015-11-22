const webpack = require('webpack');
const pkg = require('./package.json');

module.exports = {
    context: __dirname,
    entry: {
        app: ['./app/app.jsx'],
        vendors: Object.keys(pkg.dependencies)
    },
    output: {
        // path: __dirname + '/dist/js',
        // publicPath: '/js/',
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/
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
