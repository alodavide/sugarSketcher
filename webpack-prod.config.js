// webpack.config.js
var webpack = require('webpack');
var libraryName = 'sb';
var outputFile = libraryName + '.min.js';

plugins = [];
var config = {
    entry: __dirname + '/src/index.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/dest',
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_component|coverage)/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },      
    plugins: [new webpack.optimize.UglifyJsPlugin()]

};

module.exports = config;
