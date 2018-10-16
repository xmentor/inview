const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: path.resolve(__dirname, '../src/js'),
    entry: {
        inview: './inview.js'
    },
    output: {
        path: path.resolve(__dirname, '../dest/js'),
        filename: '[name].min.js',
        library: 'Inview',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['es2015'],
                plugins: ['babel-plugin-add-module-exports']
            }
        }]
    },
    optimization: {
        minimize: true
    },
    watch: true,
    devtool: 'source-map',
    mode: 'development',
};