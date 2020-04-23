const nodeExternals = require('webpack-node-externals');
const path = require('path');

const config = {
  entry: './server/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: 'tsconfig.server.json',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/server'),
  },
  target: 'node',
  externals: [nodeExternals()],
};

module.exports = (env, argv) => {
  config.mode = process.env.NODE_ENV || 'development';

  return config;
};
