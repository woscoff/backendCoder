const socket = io()

const addForm = document.getElementById("addProductForm")
const deleteForm = document.getElementById("deleteProductForm")

addForm.addEventListener("submit", e => {
    e.preventDefault();
    const title = document.getElementById("title").value
    const description = document.getElementById("description").value
    const price = document.getElementById("price").value
    const code = document.getElementById("code").value
    const stock = document.getElementById("stock").value
    const category = document.getElementById("category").value
    const thumbnails = []
    const product = { title, description, code, price, stock, category, thumbnails }
    socket.emit("addProduct", product)
})

deleteForm.addEventListener("submit", e => {
    e.preventDefault()
    const id = document.getElementById("prodId").value
    socket.emit("deleteProduct", id)
})

socket.on("msgProductAdded", msg => {
    Swal.fire({
        icon: 'success',
        title: `Producto agregado con el id: ${msg}`,
        showConfirmButton: true,
        timer: 2000
    })
    console.log(msg)
})

socket.on("msgProductDeleted", msg => {
    if (msg) {
        Swal.fire({
            icon: 'success',
            title: 'Producto eliminado',
            showConfirmButton: true,
            timer: 2000
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'No se pudo eliminar el producto',
            showConfirmButton: true,
            timer: 2000
        })
    }
    console.log(msg)
})

socket.on("getProducts", products => {
    const prodsFromSrv = document.getElementById("productsFromServer")
    prodsFromSrv.innerHTML = ""
    products.forEach(prod => {
        prodsFromSrv.innerHTML += `
            <div>
                <h3>${prod.title}</h2>
                <p>${prod.description}</p>
                <p>Precio: $${prod.price}</p>
                <p>Stock: ${prod.stock} un.</p>
                <p>Código de producto: ${prod.code}</p>
                <p>ID: ${prod.id}</p>
            </div>
        `
    });
})






/* const socket = io()
const botonChat = document.getElementById("botonChat");
const val = document.getElementById("chatBox")
const parrafosMensajes = document.getElementById("parrafosMensajes")
let user
Swal.fire({
    title: "Identificacion de usuario",
    text: "Nombre de usuario",
    input: "text",
    inputValidator: (valor) =>{
        return !valor && 'Ingrese un valor valido'
    },
    allowOutsideClick: false
}).then(resultado =>{
    user = resultado.value
    console.log(user);
})

botonChat.addEventListener("click", ()=>{
    if(val.value.trim().length > 0){
        socket.emit("mensaje", {usuario: user, mensaje: val.value})
        val.value = ""//limpio el input
    }
})

socket.on("mensajes", arrayMensajes =>{
    parrafosMensajes.innerHTML= "" //limpio los parrafos
    arrayMensajes.forEach(mensaje=>{
        parrafosMensajes.innerHTML += `<p>${mensaje.usuario}: ${mensaje.mensaje}</p>`
    })
}) */

/* socket.emit("mensaje", [{user:"Fran", mensaje: "Hola"}]) //Enviar informacion a mi servidor

socket.on("mensaje-general", info => {
    console.log(info)
})

socket.on("mensaje-socket-propio", info => {
    console.log(info)
})

 */