const path = require('path');
const MyWebpackPlugin = require('./my-webpack-plugin');

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader', // use 대신
        options: {
          publicPath: './dist/', // file-loader가 처리할 경로
          name: '[name].[ext]?[hash]', // 파일명.확장자?해쉬무력화
          limit: 20000, // url-loader가 test의 파일을 처리할 때 20kb 미만인 파일은 url-loader로 base64로 변환
          // 20kb 이상인 경우 file-loader가 실행
        }
      }
    ],
  },
  plugins: [
    new MyWebpackPlugin(),
  ]
};