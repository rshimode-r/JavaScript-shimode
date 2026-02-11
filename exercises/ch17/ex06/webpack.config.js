import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'production',
  entry: './index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname),
  },
  devtool: 'source-map',
  devServer: {
    static: path.resolve(__dirname),
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
