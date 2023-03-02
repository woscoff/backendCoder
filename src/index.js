import express from "express";
import ProductManager from "./controllers/ProductManager.js";
import routerProduct from "./routes/productos.routes.js";
import routerSocket from "./routes/socket.routes.js";
import { __dirname } from "./path.js";
import routerCart from "./routes/cart.routes.js";
import multer from 'multer'
import { engine } from 'express-handlebars';
import * as path from 'path'
import { Server } from "socket.io";
import mongoose from "mongoose";
import routerUser from "./routes/users.routes.js";

const productManager = new ProductManager('src/models/products.json');
const app = express();
const PORT = 4000;
const server = app.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT}`)
})
/* const app = express()
const PORT = 4000 

const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})
 */
//Middlewares
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views')); //__dirname + './views'


mongoose.connect("mongodb+srv://santiwoscoff:coderhouse@cluster0.mmq3z3f.mongodb.net/?retryWrites=true&w=majority")
.then(()=> console.log("DB conectada"))
.catch(error => console.log("Error en Conexion MongoDBAtlas: ", error))
//ServerIO
const io = new Server(server)
//mongodb+srv://santiwoscoff:coderhouse@cluster0.mmq3z3f.mongodb.net/?retryWrites=true&w=majority
io.on("connection", async (socket) => {
    console.log("cliente conectado")

    socket.on("addProduct", async info => {
        socket.emit("msgProductAdded", await productManager.addProduct(info.title, info.description, info.code, info.price, true, info.stock, info.category, info.thumbnails))
        socket.emit("getProducts", await productManager.getProducts())
    })

    socket.on("deleteProduct", async id => {
        socket.emit("msgProductDeleted", await productManager.deleteProduct(parseInt(id)))
        socket.emit("getProducts", await productManager.getProducts())
    })

    socket.emit("getProducts", await productManager.getProducts());
})

//Routes
app.use('/', express.static(__dirname + '/public'))
app.use('/api/products', routerProduct)
app.use("/", routerSocket)
app.use('/realtimeproducts', routerSocket)
app.use('/api/carts', routerCart)
app.use('/users', routerUser)





/* io.on("connection", (socket) => { //io.on es cuando se establece la conexion
  console.log("Cliente conectado")

  socket.on("mensaje", info => {//Cuando recibo informacion de mi cliente
    console.log(info)
  })

  socket.emit("mensaje-general", "hola desde mensaje general")
  socket.broadcast.emit("mensaje-socket-propio", "hola desde mensaje socket propio") //envio un mensaje a todos los clientes conectados a otros sockets menos al que esta conectado a este socket actualmente
})
 */

//HBS
/* app.get('/', (req,res) => {
  const user = {
    nombre: "Pablo",
    email: "p@p.com",
    rol: "Tutor"
  }
    const cursos = [
      {numero: 123, dia: "LyM", horario: "Noche"},
      {numero: 456, dia: "MyJ", horario: "Mañana"},
      {numero: 789, dia: "S", horario: "Mañana"}
    ]

    res.render("home", { //Renderizar el siguiente contenido
      titulo: "Ecommerce Backend",
      mensaje: "Pepe",
      usuario: user,
      isTutor: user.rol === "Tutor",
      cursos
    })
})
 */
