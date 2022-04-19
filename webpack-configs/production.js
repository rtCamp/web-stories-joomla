/**
 * External dependencies.
 */
const { merge } = require( 'webpack-merge' );
const { resolve } = require( 'path' );
const webpack = require('webpack');

/**
 * Internal dependencies.
 */
const sharedConfig = require( './shared' );

module.exports = merge( sharedConfig, {
  output: {
    filename: 'js/bundle.[contenthash].min.js',
    path: resolve( __dirname, '../dist' ),
    publicPath: '/',
  },
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.ProvidePlugin({
      "React": "react",
   }),
  ],
} );
