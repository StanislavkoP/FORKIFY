const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        index: ['babel-polyfill', './src/js/index.js'],
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/[name]-bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            }
        }]
    },

}