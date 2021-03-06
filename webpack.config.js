const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = (ext) => (isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`)
const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/',
}

module.exports = {
  context: PATHS.src,
  mode: 'development',
  entry: {
    plugin: `${PATHS.src}/components/app/app.ts`,
    connection: `${PATHS.src}/connection/connection.ts`,
  },
  output: {
    filename: (pathData) => {
      return pathData.chunk.name === 'plugin' ? 'plugin/tsSlider.min.js' : 'index.js'
    },
    library: 'tsSlider',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    path: PATHS.dist,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': PATHS.src,
    },
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    contentBase: 'dist',
    port: 3000,
    // hot: isDev
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new ESLintPlugin({
      files: './src/**/*.ts',
    }),
    new CopyPlugin([
      // Favicon
      {
        from: `${PATHS.src}/favicon.ico`,
        to: PATHS.dist,
      },
      // Images
      {
        from: `${PATHS.src}/${PATHS.assets}img`,
        to: `${PATHS.assets}img`,
      },
      // // Fonts:
      // {
      //   from: `${PATHS.src}/${PATHS.assets}fonts`,
      //   to: `${PATHS.assets}fonts`,
      // },
    ]),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  module: {
    rules: [
      // {
      //   // Fonts
      //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      //   exclude: `${PATHS.src}/${PATHS.assets}img`,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[name].[ext]',
      //   },
      // },
      {
        // Images
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        // Styles
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader',
        options: {
          exposes: ['$', 'jQuery'],
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
}
