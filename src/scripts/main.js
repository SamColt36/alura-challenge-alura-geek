import "../styles/styles.css";
import "./form.js";
import $ from "jquery";
import { inputSubmit } from "./dom.js";
import { resetForm } from "./formValidationFunctions.js";
import appendProductsToHtml from "./insertProducts.js";
import addProducts from "./addProducts.js";
import deleteProducts from "./deleteProducts.js";

/* Garanti que após a página seja carregada já ocorra a inserção dos products na lista (ul) */
window.onload = async () => {
  /* Como appendProductsToHtml() é uma função assíncrona, retorna uma Promise. Essa função retorna um array de promises devido a função loadsProducts(arrayProductsPerPage) [de insertProducts.js] que também é assíncrona e cria as li, tags, dinamicamente por página */
  const arrayPromisesInsertProducts = await appendProductsToHtml();

  /* É necessário que todas essas Promises sejam resolvidas para ter acesso as li, tags. Caso contrário, não é possível acessar os elementos pois ainda não foram resolvidos */
  await Promise.all(arrayPromisesInsertProducts).then(() => {
    deleteProducts($(".removeItem"));

    inputSubmit.click(async function (e) {
      await addProducts();
      /* Aplica um delay ao resetar o formulário */
      setTimeout(() => resetForm(), 1000);
      deleteProducts($(".removeItem"));
      e.preventDefault();
    });
  });
};
