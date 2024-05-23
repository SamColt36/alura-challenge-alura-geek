import Product from "./Product.js";
import {
  ulListProducts,
  inputName,
  inputDescription,
  inputPrice,
  inputImage,
} from "./dom.js";

/* Retorna um produto válido em formato de objeto */
async function createProducts() {
  const name = inputName.val().trim();
  const description = inputDescription.val().trim();
  const price = parseInt(inputPrice.val().trim(), 10);
  const image = inputImage.val().trim();
  const discount = (a, b) => {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  };

  const product = new Product(
    name,
    description,
    image,
    discount(10, 35),
    price
  );
  return product;
}

/* Cria um produto com base nas informações que vieram dos inputs após validação. Depois faz uma requisição POST para o servidor e por último inseri localmente somente o produto inserido, evitando assim de fazer a requisição */
async function addProducts() {
  const product = await createProducts();
  const { title, model, image, discount, price } = product;
  const request = await fetch("http://localhost:3000/products/", {
    method: "POST",
    headers: {
      "Content-type": "application-json",
    },
    body: JSON.stringify({
      title: title,
      model: model,
      discount: discount,
      price: price,
      image: image,
    }),
  });
  await request.json();
  ulListProducts.append(await product.getLi()).fadeIn(500);
}

export default addProducts;
