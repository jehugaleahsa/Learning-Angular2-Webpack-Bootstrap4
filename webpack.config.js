const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyWebpackPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    metadata: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 8080,
        ENV: process.env.ENV || 'development'
    },
    devtool: 'source-map',
    devServer: {
        outputPath: path.join(__dirname, './dist'),
        contentBase: 'http://localhost:8080/',
        stats: { colors: true }
    },
    debug: true,
    entry: {
        polyfills: path.resolve(__dirname, './src/app/scripts/polyfills.ts'),
        vendor: path.resolve(__dirname, './src/app/scripts/vendor.ts'),
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
                include: [ path.resolve(__dirname, './src/app/scripts') ]
            },
            {
                test: /\.html$/,
                loader: 'raw-loader',
                include: [ path.resolve(__dirname, './src') ]
            },
            {
                loader: 'css-to-string-loader!css-loader!sass-loader',
                test: /\.scss$/,
                include: [ path.resolve(__dirname, './src/app/assets') ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
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
    ]
};