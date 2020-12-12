const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin }  = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
          {
            loader:
              process.env.NODE_ENV === "production"
                ? MiniCssExtractPlugin.loader
                : "style-loader",
            options: {
              publicPath: ''
            }
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader", // use 대신
        options: {
          // publicPath: "./dist/", // file-loader가 처리할 경로
          name: "[name].[ext]?[hash]", // 파일명.확장자?해쉬무력화
          limit: 20000, // url-loader가 test의 파일을 처리할 때 20kb 미만인 파일은 url-loader로 base64로 변환
          // 20kb 이상인 경우 file-loader가 실행
        },
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
      Build Date: ${new Date().toLocaleDateString()}
      Commit Version: ${childProcess.execSync("git rev-parse --short HEAD")}
      Commit Version: ${childProcess.execSync("git config user.name")}
      `,
    }),
    new webpack.DefinePlugin({
      TWO: JSON.stringify("1+1"),
      "api.domain": JSON.stringify("http://dev/api/domain.com"),
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
      },
      minify:
        process.env.NODE_ENV === "production"
          ? {
              // 배포모드일 때만 하는게 효과적
              collapseWhitespace: true, // 빈칸 제거
              removeComments: true, // 주석 제거
            }
          : false,
    }),
    new CleanWebpackPlugin({}),
    ...(process.env.NODE_ENV === "production"
      ? [
          new MiniCssExtractPlugin({
            filename: "[name].css",
          }),
        ]
      : []),
  ],
};