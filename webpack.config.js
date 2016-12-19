const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyWebpackPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    metadata: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3000,
        ENV: process.env.ENV || 'development'
    },
    devtool: 'source-map',
    devServer: {
        outputPath: path.join(__dirname, './dist')
    },
    debug: true,
    entry: {
        app: path.resolve(__dirname, './src/app/scripts/main.ts')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        sourcemapFilename: '[name].map'
    },
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js']
    },
    module: {
        preLoaders: [
            {
                loader: 'tslint',
                test: /.ts$/,
                exclude: [ path.resolve(__dirname, './node_modules') ]
            }
        ],
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                include: [ path.resolve(__dirname, './src/app') ]
            },
            {
                test: /\.html$/,
                loader: 'raw-loader',
                include: [ path.resolve(__dirname, './src') ]
            },
            {
                loader: 'raw!sass',
                test: /\.scss$/,
                include: [ path.resolve(__dirname, './src/app/assets') ]
            }
        ]
    },
    tslint: {
        emitErrors: true
    },
    htmlLoader: {
        caseSensitive: true,
        customAttributeAssign: [/\)?\]?=/],
        customAttributeSurround: [
            [/#/, /(?:)/],
            [/\*/, /(?:)/],
            [/\[?\(?/, /(?:)/]
        ],
        minimize: true,
        removeAttributeQuotes: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: './src/app/index.html'
        }),
        new UglifyWebpackPlugin({
            minimize: true,
            sourceMap: true,
            compress: {
                warnings: false
            }
        })
    ],
    devServer: {
        contentBase: 'http://localhost:8080/',
        stats: { colors: true }
    }
};