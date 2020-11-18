const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

// Note: This is purely a development configuration. This must be modified for production
module.exports = {
    entry: {
        app: path.resolve(__dirname, "src/App.tsx"),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]_bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                include: path.resolve(__dirname, "src"),
                loader: "babel-loader",
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                    {
                        loader: "react-svg-loader",
                        options: {
                            jsx: true, // true outputs JSX tags
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, "src"),
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            // injectType: "singletonStyleTag",
                        },
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: {
                                mode: "local",
                                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                                hashPrefix: "bitmemo",
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
        ],
    },
    devtool: "cheap-module-source-map",
    mode: "development",
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin(
            { template: path.resolve(__dirname, "src/index.html"), hash: true },
        ),
    ],
    externals: {
        fs: "commonjs fs",
    },
};
