import Product from "./Product.js";
import { ulListProducts } from "./dom.js";

/* Faz a requisição e retorna um json com os produtos */
async function productsListOfServer() {
  return await fetch("http://localhost:3000/products/").then((data) =>
    data.json()
  );
}

/* Retorna um array de produtos, instanciados de acordo com a classe Products */
async function createInstanceOfProducts() {
  const data = await productsListOfServer();

  return data.map(({ title, model, image, discount, price }) => {
    return new Product(title, model, image, discount, price);
  });
}

/* Inserir os produtos na lista (ul) */
async function appendProductsToHtml() {
  const instanceProducts = await createInstanceOfProducts();

  return instanceProducts.map(async (product) =>
    ulListProducts.append(await product.getLi()).fadeIn(500)
  );
}

export default appendProductsToHtml;
