const path = require("path");

module.exports = {
  mode: "production",
  target: "node",
  entry: {
    FuncAlertToTeams: path.resolve(__dirname, "FuncAlertToTeams/index.ts"),
  },
  output: {
    filename: "[name]/index.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs",
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
    // Add support for TypeScripts fully qualified ESM imports.
    extensionAlias: {
      ".js": [".js", ".ts"],
      ".cjs": [".cjs", ".cts"],
      ".mjs": [".mjs", ".mts"],
    },
  },
  module: {
    rules: [
      // all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.([cm]?ts|tsx)$/,
        loader: "ts-loader",
      },
    ],
  },
};
