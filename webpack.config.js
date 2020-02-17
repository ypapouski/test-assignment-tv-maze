var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var rootPath = path.join(__dirname, '/src');
var distPath = path.join(__dirname, '/dist');

var webPackConfig = {
    context: rootPath,
    entry: [
        './App.js'
    ],
    output: {
        filename: 'App.js',
        path: distPath
    },
    resolve: {
        modules: [
            rootPath,
            path.join(rootPath, "js"),
             "node_modules"
        ],
        extensions: ['.js', '.jsx', '.less']
    },
    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                exclude: /node_modules|static/,
                use: ['react-hot-loader/webpack', 'babel-loader']
            },
            {
                test: /\.less$|\.css$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: '../static/index.html'})
    ],
    devServer: {
        port: 8080,
        quiet: false,
        noInfo: false,
        lazy: false,
        contentBase: '/',
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        proxy: {
            '/api': {
                target: 'http://api.tvmaze.com',
                prependPath: false,
                secure: false,
                pathRewrite: {'^/api' : ''},
                changeOrigin: true
            }
        }
    }
};

module.exports = webPackConfig;
