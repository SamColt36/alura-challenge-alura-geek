import Product from "./Product.js";
import $ from "jquery";
// Limite de itens por página
const LIMIT = 6;
const $pageCurrent = $("#page-current");
const $previousPage = $("#previous-page");
const $nextPage = $("#next-page");
const $ulListOfProducts = $("#listProducts");
// Acumulador que é usado no processo de paginação com os botões de 'arrow left/right'
let current = 0;
// A págian inicia com o valor um para uma melhor experiência do usuário
let page = 1;
// A seta 'arrow left' inicia oculta
$previousPage.hide();

// Faz a requisição e retorna um json com os produtos
async function productsList() {
  return await fetch("http://localhost:3000/products/").then((data) =>
    data.json()
  );
}

// Retorna um array paginado
async function productsPerPage(page, limit = LIMIT) {
  const listComplete = await productsList();

  return listComplete.slice(page, page + limit);
}

// Retorna um array de produtos, paginados, instanciados de acordo com a classe Products
async function createProductsPerPage(page = 0) {
  const data = await productsPerPage(page);

  return data.map(({ title, model, image, discount, price, stock }) => {
    return new Product(title, model, image, discount, price, stock);
  });
}

// Retorna a inserção dos produtos na lista (ul)
function loadsProducts(arrayProductsPerPage) {
  return arrayProductsPerPage.map(async (product) =>
    $ulListOfProducts.append(await product.getLi()).fadeIn(500)
  );
}

// Inseri os produtos na lista (ul)
async function pagination(page = 0) {
  const instanceProducts = await createProductsPerPage(page);

  // Se refere a página inicial
  if (page === 0) {
    $previousPage.hide();
  }

  // Cria a primeira lista de produtos ao carregar a página
  return loadsProducts(instanceProducts);
}

// Paginação página anterior
$previousPage.on("click", function () {
  $nextPage.show();
  page--;

  // Indica que chegou na primeira página, logo podemos ocultar a arrow left e gerar os produtos da página
  if (page > 0) {
    $pageCurrent.val(page);
    // Apagar os filhos da lista para inserção e novos produtos

    $ulListOfProducts.children().remove();
    return pagination((current -= LIMIT));
  }
  return (page = 1);
});

// Paginação próxima página
$nextPage.on("click", async function () {
  $previousPage.show();
  page++;

  // Apagar os filhos da lista para inserção e novos produtos
  $ulListOfProducts.children().remove();
  $pageCurrent.val(page);

  const promiseCollection = await pagination((current += LIMIT));
  if (promiseCollection.length < LIMIT) {
    return $nextPage.hide();
  }
});

export { pagination };
