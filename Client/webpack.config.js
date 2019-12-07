const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

/**
 * Name of block to build
 * @type {String}
 */
var block;

/**
 * Current environment
 * @type {String}
 * @default test
 */
var env = 'Test';

/**
 * Parsing cmd arguments, suported are
 * --block=block_name - which block to build
 * --env=environment  - test or product
 */
process.argv.forEach((argv) =>
{
    argv = argv.split('=');

    if (argv.length != 2)
    {
        return;
    }

    switch(argv[0])
    {
        case '--block':
            block = argv[1];
            break;
        
        case '--env':
            env = (env === 'prod') ? 'Production' : 'Test';
            break;
    }
});

module.exports =
{
    entry: `./Blocks/${block}/.Example/Example.js`,
    output: 
    {
        filename: 'Example.js',
        path: path.resolve(__dirname, `../Build/${env}/${block}`),
    },
    module:
    {
        rules:
        [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.svg$/, use: ['raw-loader'] },
        ],
    },
    plugins:
    [
        new CopyPlugin([
            { from: `./Blocks/${block}/.Example/Example.html`, to: 'Example.html' },
        ]),
    ],
    mode: 'development',
};
