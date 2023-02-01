/* import http from 'http'
const PORT = 4000;

                    //datos que entran  ---   datos que se devuelven
const server = http.createServer((request, response)=>{
    response.end("hola este es mi primer servidor node")
})
// ejecutar mi servidor
server.listen(PORT, ()=>{
    console.log(`server on port ${PORT}`);
}) */

import express from 'express'
const app = express()// app es igual a la ejecucion de expresss
const PORT = 4000;
const users =[{
    nombre: "santi",
    apellido: "alb",
    id: 1,
    cargo:"profe"
},
{
    nombre: "fran",
    apellido: "ran",
    id: 2,
    cargo:"tutor"
},
{
    nombre: "berto",
    apellido: "erto",
    id: 3,
    cargo:"tutor"
}
]

app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) =>{
    res.send("este es mi primer servidor con express")
})

app.get('/user', (req, res)=>{
    let {cargo, nombre}=req.query
    const usuarios = user.filter(user=> user.cargo === cargo)
    res.send(JSON.stringify(usuarios))
    //let {limite} = req.query
    //const arrayProducts = JSON.parse('txt')
    //const copiaProductos = arrayProductos.slice(0, limite)
})

app.get('/user/:idUser', (req, res) =>{
    const idUser = req.params.idUser
    const user = users.find(user => user.id === parseInt(idUser))
    if (user) {
        res.send(`nombre de usuario ${user.nombre}`)
    }else{
        res.send(`el usuario no existe`)
    }
})
app.listen(PORT, () =>{
    console.log(`server on port ${PORT}`);
})