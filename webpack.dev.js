import path from 'path';
import webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import WorkboxPlugin from 'workbox-webpack-plugin';
import autoprefixer from 'autoprefixer';
import exp from 'constants';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const config = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    output:{
        libraryTarget: 'var',
        library: 'Client'
    },

    module: {
        rules: [
            {
                test: /\.ejs$/,
                exclude: /node_modules/,                
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                
            },
        
   {
    test: /\.(svg|png|jpg|jpeg|gif)$/,
    include: '/src/client/images/trip.jpg',
    use: {
        loader: 'file-loader',
        options: {
            name: '[path][name].[ext]',
            outputPath: '/src/client/images/trip.jpg'
        }
    }
},
                {
       // Loader for webpack to process CSS with PostCSS
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
        // new WorkboxPlugin.GenerateSW({
        //     swDest: './dist/sw.js'
        // })

    
    ],
    devServer: {
        host: 'localhost',
        port: 3000,
    allowedHosts: [
      'http://localhost:3000/'
    ],
        hot: true,
       client: {
           progress: true,
           reconnect: 5,
        },
            static: {
                directory: path.join(__dirname, 'src/client/views/index.ejs')
            }
    },
}

export default config;
