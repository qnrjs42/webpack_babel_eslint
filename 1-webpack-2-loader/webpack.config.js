const path = require('path');

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|png)$/,
        loader: "url-loader",
        options: {
          name: "[name].[ext]?[hash]",
          publicPath: "./dist",
          limit: 10000, // 10kb미만
        },
      },
    ],
  },
};
