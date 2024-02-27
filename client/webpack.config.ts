import HtmlWebpackPlugin from "html-webpack-plugin";
import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type {Configuration as DevServerConfiguration} from 'webpack-dev-server';

type EnvType = {
  mode: 'production' | 'development'
  port: number
}

export default (env: EnvType) => {
  const isProd = env.mode === 'production';
  const isDev = !isProd;

  const config: webpack.Configuration | DevServerConfiguration = {
    mode: isProd ? 'production' : 'development',
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
      filename: "bundle.[contenthash].js",
      path: path.resolve(__dirname, "build"),
      clean: true,
    },
    devtool: isDev && 'inline-source-map',
    devServer: isDev ? {
      port: env.port ?? 3000,
      open: true,
    } : undefined,
    module: {
      rules: [
        {
          //ts-loader can work with JSX
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            {loader: MiniCssExtractPlugin.loader},
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: true,
                  ...(isDev && {localIdentName: '[name]__[local]'}),
                  ...(isProd && {localIdentName: '[hash:base64]'}),
                },
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      isDev && new webpack.ProgressPlugin(), //show building status in percents and work slowly for prod
    ].filter(Boolean),
  }

  return config;
};
