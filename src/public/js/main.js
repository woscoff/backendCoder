const socket = io()
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
})

/* socket.emit("mensaje", [{user:"Fran", mensaje: "Hola"}]) //Enviar informacion a mi servidor

socket.on("mensaje-general", info => {
    console.log(info)
})

socket.on("mensaje-socket-propio", info => {
    console.log(info)
})

 */