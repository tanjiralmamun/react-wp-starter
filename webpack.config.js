const path = require( 'path' );
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== 'production';

const entryPoint = {
    admin: './src/admin/main.js',
    frontend: './src/frontend/main.js'
}

const config = {
    entry: entryPoint,
    mode: devMode ? 'development': 'production',
    output: {
        path: path.resolve( __dirname, './assets/js' ),
        filename: devMode ? '[name].js': '[name].min.js'
    },
    externals: {
        '@wordpress/api-fetch': ['wp', 'apiFetch']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/preset-env', '@babel/preset-react' ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.png$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        mimetype: 'image/png'
                    }
                }
            },
            {
                test: /\.svg$/,
                use: 'file-loader'
            }
        ]
    },
    optimization: {
        minimizer: [new TerserJSPlugin({
          extractComments: false,
        })],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? "../css/[name].css": "../css/[name].min.css"
        })
    ]
}

module.exports = config;