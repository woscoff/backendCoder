import { promises as fs, existsSync, writeFileSync } from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }
  checkFile = () => {
    // If the file doesn't exists, we create it. Otherwise, do nothing
    !existsSync(this.path) && writeFileSync(this.path, "[]", "utf-8");
};

async addProduct(title, description, code, price, status = true, stock, category, thumbnails = []) {
    const prodObj = { title, description, code, price, status, stock, category, thumbnails };

    // Check if the product has missing data (empty value)
    if (Object.values(prodObj).includes("") || Object.values(prodObj).includes(null)) {
        return `Missing product field`
    } else {
        this.checkFile();
        try {
            // Reading file
            const read = await fs.readFile(this.path, "utf-8");
            let data = JSON.parse(read);
            // Check existing product code
            if (data.some((elem) => elem.code === prodObj.code)) {
                throw `Code "${code}" already exists, cannot add`;
            } else {
                let newID;
                !data.length ? (newID = 1) : (newID = data[data.length - 1].id + 1);
                // Push obj to the read array
                data.push({ ...prodObj, id: newID });
                // Write data to the file
                await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
                return newID
            }
        } catch (err) {
            console.error(err);
            return err
        }
    }
}
  async getProducts() {
    try {
      const read = await fs.readFile(this.path, "utf8");
      return JSON.parse(read);
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      const data = JSON.parse(read);
      const product = data.find((product) => product.id === id);
      if (product) {
        return product;
      } else {
        console.log("Not Found");
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
    if(prods.some(prod => prod.id === parseInt(id))) {
       const prodsFiltrados = prods.filter(prod => prod.id !== parseInt(id))
       await fs.writeFile(this.path, JSON.stringify(prodsFiltrados))
       return "Producto eliminado"
    } else {
        return "Producto no encontrado"
    }
}


  async updateProduct(id, { title, description, price, thumbnail, code, stock, category, status }) {
    const array =  await this.getProducts();
    try {
      if (array.some(product => product.id === id)){
        const index = array.findIndex((product) => product.id === id);
        array[index].title = title
        array[index].description = description
        array[index].price = price
        array[index].thumbnail = thumbnail
        array[index].code = code
        array[index].stock = stock
        array[index].category = category
        array[index].status = status
        await fs.writeFile(this.path, JSON.stringify(array, null, 2), "utf8");
        return this.getById(id)
      } else {
        return 'Porducto no encontrado'
      }
    } catch (error) {
      console.log("Not found");
    }
  }
}

export default ProductManager;