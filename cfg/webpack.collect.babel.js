const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BabiliPlugin = require("babili-webpack-plugin");

module.exports = {
    cache: false,
    entry: {
        app: [path.resolve(__dirname, '../utils/collect.js')]
    },
    plugins: [
        new CleanWebpackPlugin(['public/collect.js'], {
            root: path.resolve(__dirname, '../')
        }),
        // new BabiliPlugin({
        //   removeConsole:true,
        //   removeDebugger:true
        // }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    resolve: {
        extensions: ['.jsx', '.js']
    },
    output: {
        filename: 'collect.js',
        path: path.resolve(__dirname, '../public')
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(jsx|js)?$/,
            exclude: /node_modules/,
            use: 'babel-loader?cacheDirectory=true'
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            use: ['url-loader?limit=8192&name=[hash:8].[name].[ext]', 'image-webpack-loader']
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: ['url-loader?limit=8192&name=[hash:8].[name].[ext]', 'image-webpack-loader']
        }]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../public/vendors-manifest.json')
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ]

};