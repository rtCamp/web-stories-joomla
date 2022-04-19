/**
 * External dependencies.
 */
const { resolve } = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {
  entry: {    
    editor: { import: '../src/joomla-story-editor/index.js', filename: 'js/[name].js', chunkLoading: false },
    dashboard: { import: '../src/joomla-dashboard/index.js', filename: 'js/[name].js', chunkLoading: false }
  },
  context: resolve( __dirname, '../src' ),
  resolve: {
    
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [ 'babel-loader' ],
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|sass)$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ],
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [ 'file-loader', 'image-webpack-loader' ],
      },
    ],
  },
  optimization: {
    moduleIds: 'named',
  },
  plugins: [
    new HtmlWebpackPlugin( {
      template: 'index.html'
    } )
  ],
  performance: {
    hints: false,
  },
};
