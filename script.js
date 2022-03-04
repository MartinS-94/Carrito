

// storage

// const saludoStorage = localStorage.getItem(BIENVENIDA);
let nombreStorage = localStorage.getItem("usuario");
let edadStorage = localStorage.getItem("edad");

const formulario = document.getElementById("formulario");
const contFormulario = document.getElementById("contFormulario");

const saludo = document.getElementById("saludo");

formulario.addEventListener("submit", (e) => {
    // e.preventDefault();
    localStorage.setItem("usuario", formulario.children[0].value);
    localStorage.setItem("edad", formulario.children[1].value);
    nombreStorage = formulario.children[0].value;
    Swal.fire({
        title: 'Bienvenido',
        text: `¡${formulario.children[0].value}, es momento de comprar!`,
        icon: 'success',
        confirmButtonText: 'Continuar'
    });
    verificarFormulario();
});

const verificarFormulario = () => {
    if (nombreStorage && nombreStorage !== "null" && edadStorage >= 18) {
        console.log("La informacion ya existe");
        contFormulario.remove();
        saludo.innerHTML = `Bienvenido ${nombreStorage}`;
    }  else {
            console.log("Ingrese sus datos");
    }
}

verificarFormulario();



const BIENVENIDA = "bienvenido";


localStorage.setItem(BIENVENIDA, `Benvenido `); // agregar en el Nav "Bienvenido ******"
localStorage.setItem("mayorDeEdad", true); // validacion de edad para comprar

// Productos

const productos = [
    {   id: 1,
        nombre: "Cerveza 1",
        precio: 150,
        imagen: "./media/product-1.jpg"},

    {   id: 2, 
        nombre: "Cerveza 2",
        precio: 250,
        imagen: "./media/product-2.jpg"},

    {   id: 3,
        nombre: "Cerveza 3",
        precio: 350,
        imagen: "./media/product-3.jpg"}];

const listado = document.getElementById("listado");

for (const producto of productos) {
    let contenedor = document.createElement("li");
    contenedor.className = "producto";
    contenedor.id = producto.id;
        contenedor.innerHTML = `
        <div class="imagen-producto">
        <img src="${producto.imagen}" alt="">
        </div>
        <p class="nombre">${producto.nombre}</p>
        <p class="precio">${producto.precio}</p>`;
    contenedor.onclick = () => agregarACanasta(producto);
    listado.appendChild(contenedor);
}

const canasta = document.getElementById("canasta");

const agregarACanasta = (producto) => {
    let contenedor = document.createElement("div");
    contenedor.className = "producto-canasta";
    contenedor.id = producto.id;
    contenedor.innerHTML = `
        <div class="imagenProductoCanasta">
        <img src="${producto.imagen}" alt="">
        </div>
        <p class="nombreCanasta">${producto.nombre}</p>
        <p class="precioCanasta">${producto.precio}</p>
        <button class="botonDel">Eliminar</button>`;        
    canasta.appendChild(contenedor);
        Toastify({
            text: `Se agrego ${producto.nombre} a la canasta`,
            duration: 2500,
            offset: {
                x: 150, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
            }
        }).showToast();
}



const arrayProductos = [
    {   id: 1,
        nombre: "Cerveza 1",
        precio: 150,
        imagen: "./media/product-1.jpg"},

    {   id: 2, 
        nombre: "Cerveza 2",
        precio: 250,
        imagen: "./media/product-2.jpg"},

    {   id: 3,
        nombre: "Cerveza 3",
        precio: 350,
        imagen: "./media/product-3.jpg"}];

localStorage.setItem("arrayProductos", JSON.stringify(arrayProductos));

const arrayDesdeStorage = JSON.parse(localStorage.getItem("arrayProductos"));

arrayDesdeStorage.forEach(producto => {
    console.log(producto);
});


// const prodCanasta = document.getElementsById("");


// const botonAdd = document.getElementById("botonAgregar");

// let canasta = document.getElementById("canasta");

// botonAdd.onclick = () => agregarACanasta()

// document.getElementsByClassName('buttonAdd').addEventListener('click', function(e) {
//     let canasta = document.createElement("div");
//     console.log(e.target.parentNode)
//     canasta.className = "producto";
//     canasta.id = productos.id;
//     canasta.innerHTML = `<div class="imagen-canasta">
//                 <img src="${productos.imagen}" alt="">
//                 </div>
//                 <p class="nombre-canasta">${productos.nombre}</p>
//                 <p class="precio-canasta">${productos.precio}</p>`;
//     canasta.prepend(canasta);}


// <button class="buttonAdd" id="botonAgregar">Agregar al carrito</button>;
// <button class="buttonDel" id="botonQuitar">Quitar del carrito</button>;
