import $ from "jquery";
import "./addProducts.js";
import {
  validityInputText,
  validityInputPrice,
  validityInputImage,
  enableButtonSubmit,
  resetForm,
} from "./formValidationFunctions.js";
import { inputs, inputReset, inputSubmit } from "./dom.js";

/* Reseta formulário */
inputReset.click(function (e) {
  resetForm();
  e.preventDefault();
});

/* Verifica os campos isoladamente para inserir os estilos e erros personalizados. Essa classe html 'input' está disponível somente nos inputs onde há entrada de dados do usuário */
$.each(inputs, function (_, input) {
  $(input).on("input", function () {
    const attrName = $(this).attr("name");

    switch (attrName) {
      case "name":
        validityInputText($(this));
        break;
      case "description":
        validityInputText($(this));
        break;
      case "price":
        validityInputPrice($(this));
        break;
      case "image":
        validityInputImage($(this));
        break;
    }

    /* Verifica se todos os campos estão validados. Se todos estiverem, faz-se a modificação de estilo no botão submit */
    if (enableButtonSubmit(inputs)) {
      inputSubmit
        .attr("disabled", false)
        .removeClass("cursor-not-allowed")
        .addClass("cursor-pointer");
      return true;
    }

    inputSubmit
      .removeClass("cursor-pointer")
      .addClass("cursor-not-allowed")
      .attr("disabled", "disabled");
    return false;
  });
});
