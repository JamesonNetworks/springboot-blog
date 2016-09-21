var webpack    = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var production = process.env.NODE_ENV === 'production';
var path = require("path");

var plugins = [
    new LiveReloadPlugin(),
    new HtmlWebpackPlugin({
        title: 'JamesonNetworks Blog',
        template: 'src/index.ejs', // Load a custom template (ejs by default but can be changed)
        inject: 'body' // Inject all scripts into the body (this is the default so you can skip it)
    }),
    new CopyWebpackPlugin([
        { from: 'src/images/', to: 'images/' }
    ]),
    new ExtractPlugin('bundle.css'),
    new webpack.optimize.CommonsChunkPlugin({
        name:      'main', // Move dependencies to our main file
        children:  true, // Look for common dependencies in all children,
        minChunks: 2, // How many times a dependency must come up before being extracted
    })
];

if (production) {
    plugins = plugins.concat([
        new CleanPlugin('pub'),
        // This plugin looks for similar chunks and files
        // and merges them for better caching by the user
        new webpack.optimize.DedupePlugin(),

        // This plugins optimizes chunks and modules by
        // how much they are used in your app
        new webpack.optimize.OccurenceOrderPlugin(),

        // This plugin prevents Webpack from creating chunks
        // that would be too small to be worth loading separately
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 51200, // ~50kb
        }),

        // This plugin minifies all the Javascript code of the final bundle
        new webpack.optimize.UglifyJsPlugin({
            mangle:   true,
            compress: {
                warnings: false, // Suppress uglification warnings
            },
        }),

        // This plugins defines various variables that we can set to false
        // in production to avoid code related to them from being compiled
        // in our final bundle
        new webpack.DefinePlugin({
            __SERVER__:      !production,
            __DEVELOPMENT__: !production,
            __DEVTOOLS__:    !production,
            'process.env':   {
                BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
            }
        }),
        new CopyWebpackPlugin([
            { from: 'src/images/favicon.ico' },
            { from: 'entries/', to: 'entries/'}
        ])
    ]);
}

module.exports = {
    debug:   !production,
    devtool: production ? false : 'eval',
    entry:  [
        './src/index.jsx'
    ],
    output: {
        path:          path.resolve(__dirname, 'pub'),
        filename:      'bundle.js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath:    '/',
    },
    plugins: plugins,
    module: {

        loaders: [
            {
                test : /\.jsx?/,
                include : path.resolve(__dirname, 'src'),
                loaders : ['babel']
            },
            {
                test:    /\.js/,
                loaders:  ['babel'],
                include: __dirname + '/src'
            },
            {
                test:   /\.scss/,
                loader: ExtractPlugin.extract('style', 'css!sass'),
            },
            {
                test:   /\.html/,
                loader: 'html',
            }
        ]
    },
    eslint: {
        configFile: '.eslintrc'
    }
};
