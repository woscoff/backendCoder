import { promises as fs } from "fs";
import { pid } from "process";

class CartManager {
  constructor(path) {
    this.path = path;
  }
  async createCart(object) {
    try {
      const read = await fs.readFile(this.path, 'utf-8')
      let data = JSON.parse(read)
      let newId
      data.length > 0 ? newId = data[data.length - 1].id + 1 : newId = 1
      const newCart = new Cart(newId, []);
      data.push(newCart)
      await fs.writeFile(this.path, JSON.stringify(data))
      return newId
  } catch (err) {
      console.error(err)
      return null
  }
  }

  async getProducts(id) {
    try {
      const read = await fs.readFile(this.path, "utf8");
      const data = JSON.parse(read);
      const index = data.findIndex((cart) => cart.id === id);
      const prodsInCart = data[index].products;
      prodsInCart.map((product) => {
        product;
      });
      return prodsInCart;
    } catch (error) {
      throw error;
    }
  }

  async createProductInCart(cId, pId) {
    try {
      const read = await fs.readFile(this.path, "utf8")
      const data = JSON.parse(read)
      const cart = data.find(cart => cart.id === cId)
      const prodsInCart = cart.products
      const isInCart = prodsInCart.find(product => product.id === pId)
      if (!isInCart){
        const newProduct = {
          "id": pId,
          "quantity": 1
        }
        prodsInCart.push(newProduct)
      }else{
        const index = prodsInCart.findIndex(product=> product.id === pId)
        prodsInCart[index].quantity++
      }
      await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
      throw error;
    }
  }
}

export default CartManager;