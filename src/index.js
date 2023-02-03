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
app.use(express.json())

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

app.delete('/user/:idUser', (req, res) =>{
    const idUser = req.params.idUser
    const index = users.findIndex(user => user.id === parseInt(idUser))
    if (index != -1) {
        users.splice(index, 1)
        res.send(`usuario eliminado`)
    }else{
        res.send(`el usuario no existe`)
    }
})

app.put('/user/:id', (req, res)=>{
    let id= parseInt(req.params.id)
    let nombre, apellido, cargo =req.body;
    if (users.some(user=>user.id=== id)) {
        const indice = users.findIndex(usuario => usuario.id === id)
        users[indice].cargo = cargo
        users[indice].apellido = apellido
        users[indice].nombre = nombre
        users.push({nombre: nombre, apellido: apellido, cargo: cargo, id: indice})
        res.send("Usuario actualizado");
    }res.send("Usuario no encontrado");

})


app.listen(PORT, () =>{
    console.log(`server on port ${PORT}`);
})