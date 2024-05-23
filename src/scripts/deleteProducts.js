import $ from "jquery";
import axios from "axios";

/* Deletra um produto do lado do servidor com base num id hexadecimal, gerado pelo próprio servidor nas requisições. Tentei anteriormente usar o fetch por ter suporte nativo; e o ajax jquery para realizar o DELETE, porém sempre dava algum bug. Por fim, consegui usar a biblioteca axios e sem nenhuma configuração extra consegui fazer o DELETE */
async function deleteProductPerID(id) {
  let url = `http://localhost:3000/products/${id}`;
  const resolve = await axios.delete(url);
  return resolve;
}

/* Faz a consulta por nome do produto para obter o id (Por ser um identificador único é ideal para a exclusão). Por fim, retona um escutador de click associado a um ícone-svg */
async function deleteProducts(buttonRemoveProduct) {
  $.each(buttonRemoveProduct, function (_, element) {
    $(element).click(async function (e) {
      const name = $(this).parent().prev().children("h4").text();

      const id = await fetch(
        `http://localhost:3000/products?title=${encodeURIComponent(name)}`
      )
        .then((data) => data.json())
        .then(([{ id }]) => id);

      await deleteProductPerID(id).then((data) => data);

      e.preventDefault();
    });
  });
}

export default deleteProducts;
