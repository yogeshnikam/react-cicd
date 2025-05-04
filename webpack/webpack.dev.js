const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
require('dotenv').config({ path: '.env.development' });

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 3000,
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