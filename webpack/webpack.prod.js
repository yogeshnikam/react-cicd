const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
require('dotenv').config({ path: '.env.production' });

module.exports = merge(common, {
    mode: process.env.NODE_ENV || 'production',
    devtool: process.env.ENABLE_SOURCE_MAP === 'true' ? 'source-map' : false,
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: process.env.DROP_CONSOLE === 'true',
                    },
                },
            }),
            new CssMinimizerPlugin(),
        ],
    },
    performance: {
        hints: 'warning',
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
}); 