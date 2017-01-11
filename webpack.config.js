const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const LoaderOptionsPlugin = webpack.LoaderOptionsPlugin;
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const port = process.env.PORT || 8080;
const environment = process.env.NODE_ENV || "debug";
const isDebug = environment === "debug";
console.log(`Running webpack for the ${environment} environment...`);

function applyHash(fileName, extension, isChunk=false) {
    if (isDebug) {
        return `${fileName}.${extension}`;
    } else if (isChunk) {
        return `${fileName}.[chunkhash].${extension}`;
    } else {
        return `${fileName}.[hash].${extension}`;
    }
}

const configuration = {
    devtool: '#source-map',
    devServer: {
        publicPath: "/",
        compress: !isDebug,
        inline: isDebug,
        contentBase: "/",
        port: port,
        stats: { colors: true },
        historyApiFallback: true
    },
    entry: {
        polyfills: path.resolve(__dirname, './src/polyfills.ts'),
        vendor: path.resolve(__dirname, './src/vendor.ts'),
        app: path.resolve(__dirname, './src/main.ts')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: applyHash('[name].bundle', 'js', true)
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.ts$/,
                loader: "tslint-loader",
                include: [ path.resolve(__dirname, "./src") ]
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                include: [ path.resolve(__dirname, './src') ]
            },
            {
                test: /\.html$/,
                loader: 'raw-loader',
                include: [ path.resolve(__dirname, './src') ]
            },
            {
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!resolve-url-loader!sass-loader?sourceMap"
                }),
                test: /\.scss$/,
                include: [ path.resolve(__dirname, "./src") ]
            },
            {
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!resolve-url-loader?sourceMap"
                }),
                test: /\.css$/
            },
            {
                test: /\.(woff|woff2)(\?v=[\.\d]+)?$/,
                loader: 'url-loader',
                query: {
                    name: applyHash("assets/[name]", "[ext]"),
                    limit: 10000,
                    mimetype: "application/font-woff"
                }
            },
            {
                test: /\.ttf(\?v=[\.\d]+)?$/,
                loader: 'url-loader',
                query: {
                    name: applyHash("assets/[name]", "[ext]"),
                    limit: 10000,
                    mimetype: "application/octet-stream"
                }
            },
            {
                test: /\.svg(\?v=[\.\d]+)?$/,
                loader: 'url-loader',
                query: {
                    name: applyHash("assets/[name]", "[ext]"),
                    limit: 10000,
                    mimetype: "application/svg+xml"
                }
            },
            {
                test: /\.(png|jpe?g|gif|eot|ico)(\?v=[\.\d]+)?$/,
                loader: 'file-loader',
                query: {
                    name: applyHash("assets/[name]", "[ext]")
                }
            }
        ]
    },
    plugins: [
        new LoaderOptionsPlugin({
            minimize: !isDebug,
            debug: isDebug
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            inject: "body",
            template: "./src/index.html",
            chunksSortMode: function (left, right) {
                const values = { polyfills: 0, vendor: 1, app: 2 };
                const leftValue = values[left.names[0].split(".", 2)[0]];
                const rightValue = values[right.names[0].split(".", 2)[0]];
                return leftValue - rightValue;
            }
        }),
        new ExtractTextPlugin({
            filename: applyHash("[name].bundle", "css"),
            allChunks: true,
            disable: false
        }),
        new CommonsChunkPlugin({
            names: ["polyfills", "vendor"],
            minChunks: Infinity
        })
    ]
};
if (!isDebug) {
    configuration.plugins.push(
        new UglifyJsPlugin({
            mangle: {
                keep_fnames: true
            },
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    );
}
module.exports = configuration;