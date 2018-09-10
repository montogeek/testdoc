import webpack from 'webpack';
import path from 'path';

export default {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
        'js/index': [
            path.resolve(__dirname, 'resources/js/index.js'),
            path.resolve(__dirname, 'client/src/styles/app.css')
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  { loader: 'css-loader', options: { importLoaders: 1 } },
                  'postcss-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        hot: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/'
    }
};
