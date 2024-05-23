import $ from "jquery";

class Product {
  constructor(title, model, image, discount, price) {
    this.title = title;
    this.model = model;
    this.image = image;
    this.discount = parseFloat(discount);
    this.price = parseFloat(price);
  }

  getTitle() {
    return this.title;
  }

  getModel() {
    return this.model;
  }

  getDiscount() {
    if (!this.discount) {
      return "Sale";
    }
    return `${this.discount}% OFF`;
  }

  async getImage() {
    try {
      await fetch(this.image);
      return this.image;
    } catch (error) {
      return (this.image = "./images/image-not-found.png");
    }
  }

  getPrice() {
    /* Retorna uma string formatada em modeda corrente */
    if (this.discount) {
      const priceNumber = this.price * (1.0 - this.discount * 0.01);

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

export default Product;
