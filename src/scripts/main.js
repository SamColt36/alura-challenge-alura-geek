import "../styles/styles.css";
import { pagination } from "./insertProducts.js";

// Garanti que após a página seja carregada já ocorra a inserção dos products na lista (ul)
window.onload = () => {
  pagination();
};
