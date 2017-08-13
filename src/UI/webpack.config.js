var webpack = require('webpack');
var path = require('path');
var sourceDir = __dirname + '/src';
var config = {
  entry: sourceDir + '/index.js',
  output: {
    path: sourceDir,
    filename: 'app.js'
    },
    externals: {
        "request": "request"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module : {
        loaders : [
            {test: /\.js$/ , loader:'babel-loader', exclude: '/node_modules/'},
            {test: /\.jsx$/ , loader:'babel-loader', exclude: '/node_modules/'},
            {test: /\.json$/, loader: 'json-loader' }
        ]
    }
};

module.exports = config;