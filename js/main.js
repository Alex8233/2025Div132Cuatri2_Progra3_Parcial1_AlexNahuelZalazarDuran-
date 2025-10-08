const frutas= [
    {id:1, nombre:"arandano", precio: 5000, ruta_img:"./img/arandano.jpg"},
    {id: 2, nombre:"banana", precio: 1000, ruta_img:"./img/banana.jpg"},
    {id: 3, nombre:"frambuesa", precio: 4000, ruta_img:"./img/frambuesa.png"},
    {id: 4, nombre:"frutilla", precio: 3000, ruta_img:"./img/frutilla.jpg"},
    {id: 5, nombre:"kiwi", precio: 2000, ruta_img:"./img/kiwi.jpg"},
    {id: 6, nombre:"mandarina", precio: 800, ruta_img:"./img/mandarina.jpg"},
    {id: 7, nombre:"manzana", precio: 1500, ruta_img:"./img/manzana.jpg"},
    {id: 8, nombre:"naranja", precio: 9000, ruta_img:"./img/naranja.jpg"},
    {id: 9, nombre:"pera", precio: 2500, ruta_img:"./img/pera.jpg"},
    {id: 10, nombre:"anana", precio: 3000, ruta_img:"./img/anana.jpg"},
    {id: 11, nombre:"pomelo-amarillo", precio: 2000, ruta_img:"./img/pomelo-amarillo.jpg"},
    {id: 12, nombre:"pomelo-rojo", precio: 2000, ruta_img:"./img/pomelo-rojo.jpg"},
    {id: 13, nombre:"sandia", precio: 3000, ruta_img:"./img/sandia.jpg"}
];
let alumno = {dni: 43870531,nombre:"Alex", apellido:"Zalazar"};
let contenedorFrutas= document.querySelector("#contenedorFrutas");
let barraBusqueda = document.querySelector("#barraBusqueda");
let miNombre = document.querySelector("#nombre");
let contenedorCarrito= document.querySelector("#carrito");
let lengthCarrito = document.querySelector("#header-carrito");
let carrito = [];
function cantidadCarrito(){
    let cartaCarrito = `<p>Carrito: ${carrito.length} productos</p>`;
    lengthCarrito.innerHTML= cartaCarrito;
}
// Mostramos los productos que se encutra en le array
function mostrarProductos(array){
    let cartaFrutas= "";
    array.forEach(element => {      
        cartaFrutas += `<div class="card-producto">
                <img src="${element.ruta_img}" alt="${element.nombre}">
                <h3>${element.nombre}</h3>
                <p>$${element.precio}</p>
                <button onclick = "agregarACarrito(${element.id})">Agregar al carrito</button>
            </div> `;
    });
    contenedorFrutas.innerHTML = cartaFrutas;
}

// Inicializamo el mostrar productos y mostrar carrito


function init(){
    // tenemos que leer el almacenamiento local antes de mostrarCarrito(), sino  entra al else de mostrar carrito y me borra la memoria
    cargarCarrito();
    mostrarProductos(frutas);
    mostrarCarrito();
    imprimirDatosAlumno();
    cantidadCarrito();
}
init();

function imprimirDatosAlumno()
{
    let nombre = "";
    nombre +=`<h4>${alumno.nombre} ${alumno.apellido}</h4>`;
    miNombre.innerHTML= nombre;
    console.log(`nombre: ${alumno.nombre} ${alumno.apellido}`);
}

//cada vez que vaya presionando una tecla se va a ejecutar el addEventListener
barraBusqueda.addEventListener("keyup",filtrarPorducto)
// Filtramos los productos que tiene el string de la barra de busqueda incluido en el nombre del producto
function filtrarPorducto()
{
    let lectura = barraBusqueda.value;
    const array = frutas.filter(fruta => fruta.nombre.includes(lectura));
    mostrarProductos(array);
    
}


// Al momento de presionar agregar carrito buscamos el producto por su id y hacemos un push al carrito con el producto
function agregarACarrito(id){
    carrito.push(frutas.find(valor => valor.id == id))
    console.table(carrito);
   mostrarCarrito();
   

}
// Muestra el carrito actualizado. Si el array carrito esta vacio lo borra de la memoria y muestra un mensaje
function mostrarCarrito(){
    let cartaCarrito = "<h2>Carrito</h2>";
    if(carrito.length>0)
    {
        cartaCarrito+= "<ul>"
        carrito.forEach((element,indice) => {
            cartaCarrito+= `<li class="bloque-item">
            <p class="nombre-item">${element.nombre} - $${element.precio}</p>
            <button class="boton-eliminar" onclick="eliminarCarrito(${indice})">Eliminar</button>
            </li>`;
        });
        guardarCarritoLocalStorage();
        cantidadCarrito();
        cartaCarrito+=`</ul><div class="foteer-eliminar"><button class= "eliminar-carrito" onclick= "vaciarCarrito()">Vaciar carrito</button> <p>Total: $${precioTotal()}</p></div>`; 
    }
    else{
        borrarMemoria();
        cantidadCarrito();
        cartaCarrito+=`<h4 class= "vacio">Agregue un producto al carrito</h4>`
    }
    
    contenedorCarrito.innerHTML= cartaCarrito;
}
// calculamos el precio total lo que va a llevar el cliente
function precioTotal(){
    return carrito.reduce((total,element)=> total + element.precio,0);
}
// si presiona "eliminar" busca el indice del producto y lo elimina. luego actualiza carrito
function eliminarCarrito(indice)
{
    carrito.splice(indice,1);
    mostrarCarrito();
  
}
// Si presiona  "vaciar carrito"  inicializa el array a vacio y actualiza el carrito
function vaciarCarrito(){
    carrito= [];
    mostrarCarrito();
 
}
// guarda  el carrito al almacenamiento local 
function guardarCarritoLocalStorage()
{
    if(carrito.length > 0){
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }else{
         borrarMemoria();
    }
}
// borra el almacenamiento local si el carrito esta vacio 
function borrarMemoria(){
    if(carrito.length== 0){
        localStorage.removeItem("carrito");
    }
}
// lee key("carrito") que esta en JSON  parsea para recuperar el array de objeto de carrito
function cargarCarrito(){
    
    if(localStorage.getItem("carrito") != null){
        let carritoAux = JSON.parse(localStorage.getItem("carrito"));
        if(carritoAux.length>0){
            carrito = carritoAux;
        }
     }
}