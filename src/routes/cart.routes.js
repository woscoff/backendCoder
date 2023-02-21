import { Router } from 'express'
import CartManager from '../controllers/CartManager.js'
import ProductManager from '../controllers/ProductManager.js'

const routerCart = Router()
const cartManager = new CartManager('src/models/carts.json')
const prodManager = new ProductManager('src/models/products.json')

routerCart.post('/:cid/product/:pid', async (req, res) => {
    const prodQty = 1 // By now, prodQty is hardcoded to 1 as required
    const productInfo = await prodManager.getProductById(parseInt(req.params.pid))
    if (productInfo) {
        const data = await cartManager.addProduct(parseInt(req.params.cid), parseInt(req.params.pid), prodQty)
        data ? res.send(`Product "${productInfo.id}" added to cart`) : res.send(`Error on adding product`)
    } else {
        res.send(`Product "${req.params.pid}" not found`)
    }

})

routerCart.post('/', async (req, res) => {
    const data = await cartManager.createCart()
    data ? res.send(`Cart created with id ${data}`) : res.send("Error on creating cart")
})

routerCart.get('/:cid', async (req, res) => {
    const cart = await cartManager.getCart(parseInt(req.params.cid))
    cart ? res.send(cart) : res.send(`Cart not found`)
})

routerCart.delete('/:cid/product/:pid', async (req, res) => {
    const data = await cartManager.removeProductById(parseInt(req.params.cid), parseInt(req.params.pid))
    res.send(data)
})

export default routerCart

/* import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const  routerCarts = Router();
const cartManager = new CartManager("src/models/carts.json");

routerCarts.get('/:id', async (req, res)=>{
    const prodsInCart = await cartManager.getProducts(parseInt(req.params.id));
    if(prodsInCart.length === 0 ){
        res.send(`There are no products in this Cart ID: ${req.params.id}`)
    }else{
        res.send(`The Cart (ID: ${req.params.id}) contains the following products: ${JSON.stringify(prodsInCart)}`)
    
    }
    
})

routerCarts.post('/', async (req, res)=>{
    const newCart = await cartManager.createCart(req.body)
    res.send(`New Cart ${JSON.stringify(newCart)} created`)
})


routerCarts.post('/:cId/products/:pId', async (req, res)=>{
    const newProdInCart = await cartManager.createProductInCart(parseInt(req.params.cId), parseInt(req.params.pId))
    res.send(`New product added to Cart with ID: ${req.params.cId}`)
})


export default routerCarts; */