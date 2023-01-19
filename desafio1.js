class producto{    
    constructor(title,description,price,thumbnail,code,stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}
class ProductManager{
    constructor(){
        this.products = [];
    }
    addProduct(newProd){
        if ( toString(newProd.id).length>0 && newProd.title.length>0 && newProd.description.length>0 && toString(newProd.price).length>0 && newProd.thumbnail.length>0 && newProd.code.length>0 && toString(newProd.stock).length>0){
            if (this.products.filter(product=> product.code==newProd.code).length > 0)
            {
                console.error("El producto ya existe.");
            }
            else
            {
                if (!this.id) {
                    this.id = 1;
                }else{
                    this.id++;
                }
                const idIncremental = this.id;
                this.products.push({id: idIncremental,...newProd});
            }        
        }else{
            console.error("Debe completar todos los campos.");
        }
    }
    getProductos(){
        return this.products;
    }
    getProductById(id){
        const result = this.products.filter(product => product.id == id);
        if (result){
            return result;
        }else{
            return "Not found";
        }
    }
}

const prod1 = new producto("Remera Adidas","Remera Messi Selección Argentina 3 Estrellas Campeón",5000,"https://http2.mlstatic.com/D_NQ_NP_707263-MLA53146500447_012023-O.webp","a",20);
const prod2 = new producto("Buzo Adidas","Buzo adidas Essentials De Hombre",17000,"https://sporting.vtexassets.com/arquivos/ids/473443-800-800?v=637807909204800000&width=800&height=800&aspect=true","b",18);

productsManager = new ProductManager();
productsManager.addProduct(prod1);
productsManager.addProduct(prod2);
console.log(productsManager.getProductos());
console.log(productsManager.getProductById(3));