const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const isDevelopment = process.env.NODE_ENV === 'development'
const path = require('path');

module.exports = {
  devtool: 'source-map',
  devServer: {
    port: 8080,
    historyApiFallback: true,
  },
  output: {
    publicPath: "/"
  },
  module: {
    rules: [
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
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
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
    }),

    new CompressionPlugin(),
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true,
          },
        },
      }),
      new TerserPlugin(),
    ],
  },

  resolve: {
    extensions: [".js", ".jsx", ".css", ".scss", ".json", ".svg", ".png"],
    modules: [ path.resolve(__dirname, 'app'), 'node_modules']
  }
};
