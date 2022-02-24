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



const botonAdd = document.getElementById("botonAgregar");

let canasta = document.getElementById("canasta");

botonAdd.onclick = () => {
    const elemento = document.createElement("p");
    elemento.innerHTML = "asdasd";
    canasta.prepend(elemento);
    console.log("asdasdasd");
}

