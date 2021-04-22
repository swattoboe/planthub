const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname,'./build'),
    filename: 'bundle.js',
    // publicPath: '/'
  },
  // mode: process.env.NODE_ENV,
  mode: 'development',
  // plugins: [new HtmlWebpackPlugin()],
  devServer: {
    // contentBase: path.resolve(__dirname, './build'),
    // compress: true,
    host: 'localhost',
    port: 8080,
    hot: true,
    historyApiFallback: true,
    // port: 8080,
    publicPath: 'http://localhost:8080/build/build.js',

    proxy: {
      '/api/**': 'http://localhost:3000/',
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react']
          }
        }
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
        
      }
    ]
  }
};