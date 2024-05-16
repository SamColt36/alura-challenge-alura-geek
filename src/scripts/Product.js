import $ from "jquery";

export default class Product {
  constructor(title, model, image, discount, price, stock) {
    this.title = title;
    this.model = model;
    this.image = image;
    this.discount = discount;
    this.price = price;
    this.stock = stock;
  }
  getTitle() {
    return this.title.toUpperCase();
  }

  getModel() {
    return this.model.toUpperCase();
  }

  getDiscount() {
    if (!this.discount) {
      return "Sale";
    }
    return `${this.discount}% OFF`;
  }

  async getImage() {
    try {
      const requestImage = await fetch(this.image);

      if(!requestImage.ok) {
        console.log("imagem não enconttrada");
      }

      return this.image;
    } catch (error) {
      // Caso não encontre a imagem
      return (this.image = "./images/image-not-found.png");
    }
  }

  getPrice() {
    // Retorna uma string formatada em modeda corrente
    if (this.discount) {
      const priceNumber = this.price * (1 - this.discount * 0.01);
      return priceNumber.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
    }

    return this.price.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }

  async getLi() {
    const request = await $.get(
      { url: "../src/fragments/li.html", dataType: "html" },
      (data) => data
    );
    const urlResolve = await this.getImage().then((data) => data);

    const resolve = request
      .replace("${discount}", this.getDiscount())
      .replace("${title}", this.getTitle())
      .replace("${model}", this.getModel())
      .replace("${price}", this.getPrice())
      .replace("${image}", urlResolve);

    return resolve;
  }
}
