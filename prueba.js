//ECMA

/* class Empleado{
    constructor(nombre,apellido, edad, sueldo){
        this.nombre=nombre,
        this.apellido=apellido,
        this.edad=edad,
        this.sueldo=sueldo
    }
    actualizarSueldo(porcentaje){
        this.sueldo *= porcentaje
    }
    get consultarSueldo(){
        return this.sueldo;
    }
    set modificarSueldo(nuevoSueldo){
        this.sueldo = nuevoSueldo;
    }
}
const empleado1= new Empleado("Pedro", "Parker", 20, 1200);
empleado1.modificarSueldo = 1500;
console.log(empleado1.consultarSueldo); */

// ECMA 7
/* console.log(Math.pow(5,3));
console.log(5**3);
const nombres = ['Fran', 'Maria', 'Mateo', 'Matilde']
console.log(nombres.includes('Elias')); */

// ECMA 8
/* const libro ={
    nombre: "Pedro de la mar",
    editorial: "la española",
    autor: "Sancho",
    year: 2020,
    precio: 800,
    stock: 10
} */

//console.log(Objet.keys(libro)); // devuelve calves del objeto
//console.log(Objet.values(libro)); // devuelve valores del objeto
//console.log(Objet.entries(libro)); // devuelve ambas


//ECMA 9
/* const libro ={
    nombre: "Pedro de la mar",
    editorial: "la española",
    autor: "Sancho",
    year: 2020,
    precio: 800,
    stock: 10
}
const libro1= {...libro}
console.log(libro1);
 */
//function sumar(...num){ // Operador REST => hace referencia a n cantiad de parametros de una funcion 
//    return num.reduce((a,b) => a+ b, 0)
//}
//console.log(sumar(1,2,5,6,3,4,8,7,7)); 

//ECMA 10 
/* const nombre = "  Francisco Pugh"
console.log(nombre);
console.log(nombre.trim());

const facturas = [20000[40000, 22000, 5000], 9000, [70000, 30000]]
console.log(facturas.flat().reduce((a,b)=>a+b,0)); */ //.flat() eliminacion de anidaciones internas

/* import {} from '' */

/* const user = true
if (user) {
    import('ruta').then(({contenido}) => console.log(contenido))
} else { */
    //contenido si el user no es valido
//}

//ECMA 11
const facturas = [20000[40000, 22000, 5000], 9000, [70000, 30000]]
//console.log(5+undefined);//=>NaN(not a number)// 5+null=5

console.log(facturas.flat(3).map(factura=>(factura = factura ?? 0).reduce((a,b)=>a+b,0))) // operador nullish si factura es undefined evuelvo 0

class Empleado{
    #sueldo // propiedad privada
    constructor(nombre,apellido, edad, sueldo){
        this.nombre=nombre,
        this.apellido=apellido,
        this.edad=edad,
        this.#sueldo=sueldo
    }
    actualizarSueldo(porcentaje){
        this.#sueldo *= porcentaje
    }
    get consultarSueldo(){
        return this.#sueldo;
    }
    set modificarSueldo(nuevoSueldo){
        this.#sueldo = nuevoSueldo;
    }
}
const empleado1= new Empleado("Pedro", "Parker", 20, 1200);
const empleado2= new Empleado("Pedro", "Parker", 20, 1200);
console.log(empleado1.consultarSueldo);
