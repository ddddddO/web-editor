const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { modules: false }]]
            }
          }
        ]
      },
      {
        test: /\.css$/,
				use: ['style-loader', 'css-loader']
      },
      {
        test: /\.ttf$/,
				use: ['file-loader']
      }
    ]
  },
  plugins: [new MonacoWebpackPlugin()]
};