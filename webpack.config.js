'use strict';

const webpack = require('webpack');

const ExtractTextPlugin = require("extract-text-webpack-plugin"),
      path = require('path');

const APP = path.join(__dirname, '/src');

module.exports = {

    context: APP,

    entry: {
        index: './home.js',
        uxModel: './uxModel.js'
    },

    output: {
        path: __dirname + '/public/',
        publicPath: '/',
        filename: '[name].js'
    },

    module: {
        loaders : [
            { test: /\.js$/, loader: 'babel', exclude: [/node_modules/] },
            { test: /\.jade$/, loader: "jade" },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass?sourceMap') },
            { test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/, loader: 'file?name=[path][name].[ext]?[hash]' }
        ]
    },

    plugins: [
        //new ExtractTextPlugin("style.css"),
        new ExtractTextPlugin('./css/[name].css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings:     false,
                drop_console: true,
                unsafe:       true
            }
        })
    ],

    devtool: 'cheap-inline-module-source-map',

    devServer: {
        contentBase: __dirname + '/public',
        host: '0.0.0.0',
        port: 8080,
        hot: true
    }


};