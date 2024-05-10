const path = require("path"); // utilitários para trabalhar com caminhos de arquivos e diretórios
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // produzir um arquivo css autônomo
const HtmlWebpackPlugin = require("html-webpack-plugin"); // plugin para gerar o html de saída

module.exports = {
  mode: "development", //Definir o modo de desenvolvimento
  entry: "./src/scripts/main.js", // Ponto de entrada é onde o webpack procura começar a construir os arquivos de saída
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "./docs"),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    new HtmlWebpackPlugin({
      // Adicione o plugin aqui
      template: "./src/pages/index.html", // Especifique o modelo HTML
      filename: "index.html", // Nome do arquivo de saída
      minify: {
        collapseWhitespace: true, // Minificar o HTML
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
};
