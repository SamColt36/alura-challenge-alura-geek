// Imprimi em tela um mensagem de erro conforme respectiva propriedade do objeto ValidityState
// Separei uns erros recorrentes e algumas mensagens personalizadas
function displayMessageError(input, notice) {
  let messageOutput = null;

  const typeErrosValidity = [
    "rangeOverflow",
    "rangeUnderflow",
    "tooLong",
    "patternMismatch",
    "tooShort",
    "valueMissing",
  ];

  const messages = {
    valueMissing: "O campo não pode estar vazio.",
    patternMismatch: "Fora do padrão esperado.",
    tooShort: "Muito curto. Tente escrever um pouco mais.",
    tooLong: "Muito longo. Tente escrever um pouco menos.",
    rangeOverflow: "Entrada maior que a esperada.",
    rangeUnderflow: "Entrada menor que a esperada.",
  };

  typeErrosValidity.forEach((error) => {
    if (input[0].validity[error]) {
      input[0].validity[error];
      messageOutput = messages[error];
    }
  });

  if (messageOutput !== null) {
    return notice.fadeIn().text(messageOutput);
  }
}

// Efeito de desaparecimento da mensagem de erro, quando o campo estiver válido
function displayMessageOk(notice) {
  return notice.fadeOut(500);
}

// Adiciona uma classe html 'valid' que auxilia no processo de validação e estilização
function isValid(input) {
  input.addClass("valid");
  displayMessageOk(input.next());
}

// Retira a classe html 'valid' inserida pela função isValid()
function isInvalid(input) {
  input.removeClass("valid");
  displayMessageError(input, input.next());
}

/* Valida um input tipo text com base nos comprimentos mínimo e máximo especificado no html e também por uma expressão regular, que  permite caracteres alfa-numéricos e alguns outros caracteres usuais */
function validityInputText(input) {
  const value = input.val().trim();
  const regex = /^[a-zA-Z0-9\s\-\(\)\.]+$/;

  // P/ caso inválido
  if (
    !(
      regex.test(value) &&
      value.length < input.attr("maxlength") &&
      value.length > input.attr("minlength")
    )
  ) {
    isInvalid(input);
    return false;
  }
  isValid(input);
  return value;
}

/* Valida um input tipo number com base nos comprimentos mínimo e máximo especificado no html e também por uma expressão regular, que  permite caracteres numéricos separados por ponto final ou vírgula, e com aproximação decimal de duas casas. Retorna um número com duas casas decimais. EXEMPLO: 56,36 e 961.45 */
function validityInputPrice(input) {
  const value = input.val().trim();
  const regex = /^\d+([.,]\d{2})?$/;
  // O valueFormatter é um valor que futuramente ao fazer o POST no DB
  let valueFormatter = parseFloat(value.replace(",", "."), 10);
  // P/ caso inválido
  if (
    !(
      regex.test(value) &&
      value.length < input.attr("maxlength") &&
      value.length > input.attr("minlength")
    )
  ) {
    isInvalid(input);
    return false;
  }
  isValid(input);
  return valueFormatter.toFixed(2);
}

/* Valida um input tipo url com base nos comprimentos mínimo e máximo especificado no html e também por uma expressão regular, que  permite caracteres esperados para um a url válida, como o protocolo (https ou http), pois pontos, duas barras. */
function validityInputImage(input) {
  const value = input.val().trim();
  const regex = /https?:\/\/.+/;

  // P/ caso inválido
  if (
    !(
      regex.test(value) &&
      value.length < input.attr("maxlength") &&
      value.length > input.attr("minlength")
    )
  ) {
    isInvalid(input);
    return false;
  }
  isValid(input);
  return value;
}

// Essa função retorna true se todos os inputs destacados contenham a classe html 'valid'. Classe tal, que  é adicionada quando o input estiver validado
function enableButtonSubmit(arrayInputs) {
  return Array.from(arrayInputs).every((input) => {
    return input.classList.contains("valid");
  });
}

export {
  validityInputText,
  validityInputPrice,
  validityInputImage,
  enableButtonSubmit,
};
