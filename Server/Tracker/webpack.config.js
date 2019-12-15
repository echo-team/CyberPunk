const path = require('path');
const { DefinePlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports =
{
    entry: './Tracker.js',
    output: 
    {
        filename: 'Tracker.js',
        path: path.resolve(__dirname, '../../Build/Test/'),
    },
    target: 'electron-main',
    plugins:
    [
        new CopyPlugin([
            { from: './Observer.js', to: '../../Build/Test/Observer.js' },
        ]),
        new DefinePlugin({ $dirname: '__dirname' }),
    ],
    mode: 'development',
};
