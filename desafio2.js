import {promises as fs} from "fs"

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct (titulo, descripcion, precio, imagen, stock, code) {
        try{
            let valid  = [titulo, descripcion, precio, imagen, stock, code]
            const read = await fs.readFile(this.path, "utf8");
            const data = JSON.parse(read);
            const objCode = data.find((product) => product.code == code);

            if(objCode){
                throw error;
            }else{
                if(valid.includes(null)||valid.includes("")||valid.includes(undefined)){
                    console.log("Debe completar todos los campos");
                }else{
                    let id;
                    id = data.length + 1;
                    let nuevoProducto = new Product(titulo, descripcion, precio, imagen, stock, code, id);
                    data.push(nuevoProducto);
                    await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
                    
                }
            }
        }catch (error){
            console.log("El code del producto está en uso" + error);
        };
    }

    async getProducts() {
        try {
        const read = await fs.readFile(this.path, "utf8");
        console.log(JSON.parse(read)); 
        } catch (error) {
        throw error;
        }
    }

    async getProductByID(id) {
        try {
        const read = await fs.readFile(this.path, "utf-8");
        const data = JSON.parse(read);
        const product = data.find((product) => product.id === id);
        if (product) {
            console.log(product);
        } else {
            console.log("No se encontró el producto");
        }
        } catch (error) {
        throw error;
        }
    }

    async deleteProduct(id) {
        try {
        const read = await fs.readFile(this.path, "utf-8");
        const data = JSON.parse(read);
        const newData = data.filter((product) => product.id !== id);
        await fs.writeFile(this.path, JSON.stringify(newData), "utf-8");
        return console.log(
            `---Producto eliminado---`
        );
        } catch (error) {
        throw error;
        }
    }

    async updateProduct(id, titulo, descripcion, precio, imagen, stock, code) {
        const read = await fs.readFile(this.path, "utf-8");
        const data = JSON.parse(read);
        if (data.some(producto => producto.id === id)){
            let indice = data.findIndex(producto => producto.id === id)
            data[indice].title      = titulo
            data[indice].description= descripcion
            data[indice].price      = precio
            data[indice].thumbnail  = imagen
            data[indice].code       = code
            data[indice].stock      = stock
            await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
        }else{
            console.log("el producto no ha sido encontrado");
        }

    }
}

class Product {
    constructor(titulo, descripcion, precio, imagen, stock, code, id) {
        this.title = titulo;
        this.description = descripcion;
        this.price = precio;
        this.thumbnail = imagen;
        this.code = code;
        this.id = id;
        this.stock = stock;
    }
}

const prod1 = new ProductManager("./productos.json");

prod1.addProduct("zzz", "tal vez", 500, "IMG", 80, 12)  

prod1.updateProduct(1,"actualizado","se",1500,"megaImg",34,5)
console.log(prod1.getProducts());
//prod1.deleteProduct(1)
//console.log(prod1.getProductByID(3))