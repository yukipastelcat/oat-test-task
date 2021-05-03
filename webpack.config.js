const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

const config = {
  entry: './src/main.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'src/public/index.html' }],
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, '/src/public'),
    port: 8081
  }
}

module.exports = config
