const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");



    module.exports = {

        mode: 'development',
        output: {
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                    options: {
                        sources: false,
                        minimize: false,
                    },
                },
                {
                    test: /\.css$/,
                    exclude: /estilos.css$/,
                    use: ["style-loader", "css-loader"],
                },                
                {
                    test: /estilos.css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },                
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [
                      {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'assets/[name].[ext]',
                        }
                      },
                    ],
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: 'index.html',
                inject: 'body',
            }),

            new MiniCssExtractPlugin({
                filename: "[name].css",
                ignoreOrder: false,                
            }),

            new CopyPlugin({
                patterns: [
                  { from: "src/assets/", to: "assets/" },
                ],
              })
        ]

    }


