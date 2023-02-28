const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
  const outputPath = path.resolve(__dirname, `app/public/docs/v${env.version}`);

  return {
    mode: "development",
    entry: {
      app: require.resolve("./swagger/src/index"),
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.yaml$/,
          use: [
            { loader: "json-loader" },
            { loader: "yaml-loader", options: { asJSON: true } },
          ],
        },
        {
          test: /\.css$/,
          use: [{ loader: "style-loader" }, { loader: "css-loader" }],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            // Copy the Swagger OAuth2 redirect file to the project root;
            // that file handles the OAuth2 redirect after authenticating the end-user.
            from: require.resolve("swagger-ui/dist/oauth2-redirect.html"),
            to: "./",
          },
          {
            // Copy the Swagger yaml file to target location
            from: path.resolve(__dirname, `swagger/src/swagger-config.yaml`),
            to: "./",
          },
        ],
      }),

      new HtmlWebpackPlugin({
        template: "./swagger/index.html",
      }),
    ],
    output: {
      filename: "[name].bundle.js",
      path: outputPath,
    },
  };
};
