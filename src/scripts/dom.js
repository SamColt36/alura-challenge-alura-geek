import $ from "jquery";
const buttonRemoveProduct = $(".removeItem");
const ulListProducts = $("#listProducts");
const inputSubmit = $("input[name='submit']");
const inputReset = $("input[name='reset']");
const inputName = $("input[name='name']");
const inputDescription = $("input[name='description']");
const inputPrice = $("input[name='price']");
const inputImage = $("input[name='image']");
const inputs = $(".input");

export {
  inputReset,
  inputs,
  ulListProducts,
  buttonRemoveProduct,
  inputSubmit,
  inputName,
  inputDescription,
  inputPrice,
  inputImage,
};
