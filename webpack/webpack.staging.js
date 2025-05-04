const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');

// Load environment variables
const env = process.env.NODE_ENV || 'staging';
console.log('Current environment:', env);

module.exports = merge(common, {
    mode: env === 'production' ? 'production' : 'development',
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: false, // Keep console logs for staging
                    },
                },
            }),
            new CssMinimizerPlugin(),
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    performance: {
        hints: 'warning',
        maxEntrypointSize: 1024000, // Increased to 1MB for staging
        maxAssetSize: 1024000,      // Increased to 1MB for staging
    },
    // Staging-specific features
    devServer: {
        port: 3001,
        static: {
            directory: path.resolve(__dirname, "../public")
        },
        open: true,
        hot: true,
        liveReload: true,
        client: {
            overlay: {
                warnings: false,
                errors: true
            }
        }
    }
}); 