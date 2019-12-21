const path = require('path');


module.exports = {
  mode: 'production',
  entry: {
    'nativejs-select.min': ['./polyfills/index.js', './src/index.ts']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    library: 'NativejsSelect',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src/'), 'node_modules'],
    extensions: ['.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['ts-loader', 'eslint-loader']
      },
    ],
  },
}