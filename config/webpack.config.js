// Example webpack configuration with asset fingerprinting in production.
'use strict'

require('dotenv').config({silent: true})

var path = require('path')
var webpack = require('webpack')
var StatsPlugin = require('stats-webpack-plugin')
var autoprefixer = require('autoprefixer')

// must match config.webpack.dev_server.port
var devServerPort = 3808

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'yarnisbroken') {
  process.env.NODE_ENV = 'production'
}

// set NODE_ENV=production on the environment to add asset fingerprints
var production = process.env.NODE_ENV === 'production'

var config = {
  entry: {
    // Sources are expected to live in $app_root/webpack
    'application': ['./webpack/index.js']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules(?!\/quicktrax-components)/,
        loader: 'react-hot!babel'
      },
      {
        test: /\.s?css$/,
        loader: 'style!css!resolve-url-loader!postcss!sass?sourceMap'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|otf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file'
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url?limit=1'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },

  output: {
    // Build assets directly in to public/webpack/, let webpack know
    // that all webpacked assets start with webpack/

    // must match config.webpack.output_dir
    path: path.join(__dirname, '..', 'public', 'webpack'),
    publicPath: '/webpack/',

    filename: production ? '[name]-[chunkhash].js' : '[name].js'
  },

  resolve: {
    root: path.join(__dirname, '..', 'webpack')
  },

  plugins: [
    new webpack.EnvironmentPlugin(
      ['NODE_ENV']
    ),
    // must match config.webpack.manifest_filename
    new StatsPlugin('manifest.json', {
      // We only need assetsByChunkName
      chunkModules: false,
      source: false,
      chunks: false,
      modules: false,
      assets: true
    })
  ],
  postcss: [
    autoprefixer({
      // See https://github.com/ai/browserslist for the syntax used here.
      browsers: [
        'Safari >= 9',
        'Explorer >= 9',
        'Firefox >= 24',
        'last 2 Chrome versions'
      ]
    })
  ]
}

if (production) {
  config.plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
      sourceMap: false
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  )
} else {
  config.entry.application.unshift(
    'webpack-dev-server/client?http://localhost:' + devServerPort,
    'webpack/hot/only-dev-server'
  )
  config.plugins.unshift(
    new webpack.HotModuleReplacementPlugin()
  )
  config.devServer = {
    port: devServerPort,
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true
  }
  config.output.publicPath = '//localhost:' + devServerPort + '/webpack/'
}

module.exports = config
