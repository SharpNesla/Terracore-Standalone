const path = require('path');

module.exports = {
  entry: {main: './electron/main.ts'},
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  target: "electron",
  node: {
    __dirname: false
  }
}