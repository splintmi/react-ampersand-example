(function () {
    'use strict';

    module.exports = {
        entry: './client.js',
        output: {
            path: 'build',
            filename: 'app.js',
            chunkFilename: "[id].bundle.js",
            publicPath: '/static/'
        },
        module: {
            loaders: [
                { test: /\.jsx$/, loader: 'jsx-loader'},
                { test: /\.css$/, loader: "style!css" }
            ]
        },
        externals: {
            //'react': 'React'
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        }
    }
}());
