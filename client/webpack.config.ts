import HtmlWebpackPlugin from "html-webpack-plugin";
import path from 'path';
import webpack from 'webpack';
import type {Configuration as DevServerConfiguration} from 'webpack-dev-server';

type EnvType = {
  mode: 'production' | 'development'
  port: number
}

export default (env: EnvType) => {
  const isDev = env.mode === 'development' || env.mode === undefined;

  const config: webpack.Configuration = {
    mode: env.mode ?? "development",
    entry: path.resolve(__dirname, "src", "index.ts"),
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
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      isDev && new webpack.ProgressPlugin(), //show building status in percents and work slowly for prod
    ].filter(Boolean),
  }

  return config;
};
