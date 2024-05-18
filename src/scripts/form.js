import $ from "jquery";
import { pagination } from "./insertProducts.js";
import {
  validityInputText,
  validityInputPrice,
  validityInputImage,
  enableButtonSubmit,
} from "./formValidationFunctions.js";

// Garanti que após a página seja carregada já ocorra a inserção dos products na lista (ul)
window.onload = () => {
  pagination();
};

// Reseta formulário
$("input[name='reset']").click(function (e) {
  const inputSubmit = $("input[name='submit']");
  inputSubmit.attr("disabled", "disabled");
  inputSubmit.removeClass("cursor-pointer").addClass("cursor-not-allowed");

  console.log("click");
  $.each($(".input"), function (_, input) {
    $(input).next().fadeOut(500);
    $(input).val("");
  });

  e.preventDefault();
});

// Verifica os campos isoladamente para inserir os estilos e erros personalizados
$.each($(".input"), function (_, input) {
  $(input).on("input", function () {
    const inputSubmit = $("input[name='submit']");
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

    // Verifica se todos os campos estão validados. Se todos estiverem, faz-se a modificação de estilo no botão submit
    if (enableButtonSubmit($(".input"))) {
      inputSubmit.attr("disabled", false);
      inputSubmit.removeClass("cursor-not-allowed").addClass("cursor-pointer");
      return true;
    }

    inputSubmit.attr("disabled", "disabled");
    inputSubmit.removeClass("cursor-pointer").addClass("cursor-not-allowed");
  });
});
