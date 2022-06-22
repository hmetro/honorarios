const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let config = {
    // config object
    mode: "development",
    entry: {
        app: "./src/index.js" // entry file
    },
    output: {
        // output
        publicPath: "/",
        path: path.resolve(__dirname, "dist"), // ouput path
        filename: "[name].js"
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                    plugins: [
                        [
                            "transform-react-jsx",
                            {
                                // jsx
                                pragma: "m"
                            }
                        ]
                    ]
                }
            }]
        },
        {
            test: /\.(le|c)ss$/,
            use: [{
                loader: "css-hot-loader" //css hot
            },
            {
                loader: MiniCssExtractPlugin.loader
            },
            {
                loader: "css-loader"
                // Not Use modules
                // options: {
                //     modules: true,
                //     localIdentName: '[name]_[local]_[hash:7]'
                // },
            },
            {
                loader: "postcss-loader",
                options: {
                    plugins: [require("autoprefixer")]
                }
            },
            {
                loader: "less-loader"
            }
            ]
        },
        // {
        //     test: /\.(eot|svg|ttf|woff2?)$/,
        //     use: [{
        //         loader: 'file-loader',
        //         options: {
        //             name: '[name]-[hash:7].[ext]',
        //             outputPath: 'assets/fonts'
        //         }
        //     }]
        // },
        {
            test: /\.(png|gif|jpe?g|svg)$/i,
            use: [{
                loader: "url-loader",
                options: {
                    name: "[name].[ext]",
                    limit: 8192,
                    outputPath: "assets/"
                }
            }]
        }
        ] // end rules
    },
    plugins: [
        // webpack plugins
        new HtmlWebpackPlugin({
            template: "index.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new webpack.ProvidePlugin({
            m: "mithril" //Global access
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        hot: true,
        open: true,
        port: 3000,
        historyApiFallback: true
    },
    devtool: "eval-source-map" // enable devtool for better debugging experience
};

module.exports = config;