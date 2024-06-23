import path from 'path';
import webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
//const { CopyWebpackPlugin } = pkg;
import WorkboxPlugin from 'workbox-webpack-plugin';
import autoprefixer from 'autoprefixer';
import exp from 'constants';
import {fileURLToPath} from 'url';
//const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
//const __dirname = path.dirname(__filename); // get the name of the directory
const __dirname = path.resolve();
const config = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    output: {
        libraryTarget: 'var',
        library: 'Client',
        path: path.resolve(__dirname, 'dist'),
        //publicPath: '/',
        //  path: '.Travel-App/dist/main.js',
        // filename: 'index.js'
    },

    module: {

        rules: [
            {
                test: /\.ejs$/,
                exclude: /node_modules/,
                // loader: 'ejs-loader',
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                //  test: /\.ejs$/, loader: 'ejs-loader',
                // query: {
                //  interpolate: /<\$=([\s\S]+?)\$>/g,
                // evaluate: /<\$([\s\S]+?)\$>/g,
                //  }
                //  },
//    {
//     test: /\.(svg|png|jpg|jpeg|gif)$/,
//     include: '/src/client/images/trip.jpg',
//     use: {
//         loader: 'file-loader',
//         options: {
//             name: '[path][name].[ext]',
//             outputPath: '/src/client/images/trip.jpg'
//         }
//     }
// },
                // {
                //  Loader for webpack to process CSS with PostCSS
                //    loader: 'postcss-loader',
                //         options: {
                //           postcssOptions: {
                //             plugins: [
                //               autoprefixer
                //             ]
                //           }
                //         }
            },

        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {from: "src/client/views", to: "views"},
            ]
        }),
        new HtmlWebPackPlugin({
            template: "raw-loader!./src/client/views/index.ejs",
            filename: "./index.ejs",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        // new webpack.ProgressPlugin(),
        // new CopyWebpackPlugin({
        //   patterns: [
        //     {from: "src/client/views", to: "views"}
        //   ]
        // })
    ],
    devServer: {
        host: 'localhost',
        port: 3000,
        //     // open: true,
        //     compress: true,
        // hot: true,
        // watchFiles: ['./dist/index.ejs'],
        allowedHosts: [
            'http://localhost:3000/index.ejs/'
        ],
        // //    client: {
        // //        progress: true,
        // //        reconnect: 5,
        // //     },
        static: {
            directory: path.join(__dirname, './dist')
            // directory: path.join(__dirname, './dist/')
        },
        historyApiFallback: true,
        watchFiles: ["./src/**/*.{ejs,js,jsx,ts,tsx}"]
    },
}

export default config;
