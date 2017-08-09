var webpack = require('webpack');
var path = require('path');

var config = {
  entry: __dirname + '/index.js',
  output: {
    path: __dirname,
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
            {
                test : /\.jsx?/,
                include : __dirname,
                exclude: "/node_modules/",
                loader: 'babel-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
};

module.exports = config;