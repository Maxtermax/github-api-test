const webpack = require('webpack');
const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const BabiliPlugin = require('babili-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './'),
  entry: {
    main: './src/js/main/index.js',
    gists: './src/js/gists/gists.js'
  },
  output: {
    path: path.join(__dirname, "/build/js"),
    filename:"[name].bundle.js",
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js','.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              "presets":["es2015", "react"]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader:"style-loader"
          },{
            loader:"css-loader",
          },{
            loader:"sass-loader",
            options: {
               includePaths: [
                path.resolve(__dirname, "./node_modules/foundation-sites/scss"),
                path.resolve(__dirname, "./node_modules/motion-ui")
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: (function() {
    let ENV = process.env.NODE_ENV;
    let plugins =  [
      new WebpackNotifierPlugin({alwaysNotify: true}),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(ENV || "development")
        }
      })
    ]
    if(ENV === "production") plugins.push(new BabiliPlugin());
    return plugins;
  })()
}
