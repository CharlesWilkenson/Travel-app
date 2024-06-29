import HtmlWebPackPlugin from 'html-webpack-plugin';
import WorkboxPlugin from 'workbox-webpack-plugin';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const configProd = {
    entry: './src/client/index.js',
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "raw-loader!./src/client/views/index.ejs",
            filename: "./index.ejs",
        }),
        new WorkboxPlugin.GenerateSW({
            swDest: './dist/sw.js'
        }),
        new MiniCssExtractPlugin({filename: "[name].css"})
    ],
    devServer: {
        port: 3000,
        allowedHosts: 'all'
    }
}
export default configProd;