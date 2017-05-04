'use strict';

const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin'),
      UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
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
        rules : [
            { 
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.jade$/,
                use: {
                    loader: "jade-loader"
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true || {/* CSSNano Options */ }
                            }
                        },
                        'sass-loader?sourceMap'
                    ]
                })
            },
            {
                test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                use: 'file-loader?name=[path][name].[ext]?[hash]'
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('./css/[name].css'),
        new UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],

    devtool: 'cheap-inline-module-source-map',

    devServer: {
        contentBase: __dirname + '/public',
        //host: '0.0.0.0',
        port: 8080,
        hot: true
    }


};