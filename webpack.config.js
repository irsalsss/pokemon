const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader', options: { importLoaders: 1 }
          }
        ]
      },
      {
        test: /.js?x?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            sourceType: "unambiguous",
            plugins: [
              [
                "@babel/plugin-proposal-object-rest-spread",
                { useBuiltIns: true }
              ],
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-proposal-optional-chaining",
              "@babel/plugin-transform-runtime"
            ]
          }
        },
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [{ loader: "file-loader" }]
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ]
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    }),

    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    })
  ],

  resolve: {
    extensions: [".js", ".jsx", ".css", ".scss", ".json", ".svg", ".png"],
    modules: [ path.resolve(__dirname, 'app'), 'node_modules']
  }
};
