// let products = [];
// let total = 0;
// const itemAdd = document.getElementById("product-1");


// function add(product, price) {
//     console.log(product, price);
//     products.push(product);
//     total = total + price;
//     document.getElementById("checkout").innerHTML = `Pagar $${total}`;
//     console.log(`Total a pagar $${total}`);
//     itemAdd.innerHTML = "Se agrego este producto a la canasta";
// }

// function pay() {
//     window.alert(products.join(", \n"));
// }

// storage

// const saludoStorage = localStorage.getItem(BIENVENIDA);
let nombreStorage = localStorage.getItem("usuario");
let edadStorage = localStorage.getItem("edad");

const formulario = document.getElementById("formulario");
const contFormulario = document.getElementById("contFormulario");

const saludo = document.getElementById("saludo");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.setItem("usuario", formulario.children[0].value);
    localStorage.setItem("edad", formulario.children[1].value);
    nombreStorage = formulario.children[0].value;
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

// let nombre = prompt("Ingresa tu nombre")
localStorage.setItem(BIENVENIDA, `Benvenido `); // agregar en el Nav "Bienvenido ******"
localStorage.setItem("mayorDeEdad", true); // validacion de edad para comprar

// const saludoStorage = localStorage.getItem(BIENVENIDA);

// const saludo = document.getElementById("saludo");

// saludo.innerHTML = saludoStorage + ` ${nombre}`;

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
        <div class="imagen-producto">
        <img src="${producto.imagen}" alt="">
        </div>
        <p class="nombre">${producto.nombre}</p>
        <p class="precio">${producto.precio}</p>`;
    canasta.appendChild(contenedor);
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
