// INSERTAR PRODUCTOS EN LA TIENDA

const listado = document.getElementById("listado");
const canasta = document.getElementById("canasta");

const insertarProductos = () => {
  return fetch("productos.json");
};

insertarProductos()
  .then((resultado) => resultado.json())
  .then((respuesta) => {
    listado.innerHTML = ``;
    for (const producto of respuesta) {
      let contenedor = document.createElement("li");
      contenedor.className = "producto";
      contenedor.id = producto.id;
      contenedor.innerHTML = `
            <div class="imagen-producto">
            <img src="${producto.img}" alt="">
            </div>
            <p class="nombre">${producto.nombre}</p>
            <p class="precio">$ ${producto.precio}</p>`;
      contenedor.onclick = () => agregarACanasta(producto);
      listado.appendChild(contenedor);
      mostrarEnCanasta();
      botonDeVaciar();
    }
  })
  .catch((error) => {
    listado.innerHTML = error;
  });

  // FUNCION MOSTRAR EN LA CANASTA

const mostrarEnCanasta = () => {
  let canastaStorage = JSON.parse(localStorage.getItem("canasta"));
  canasta.innerHTML = "";
  if (canastaStorage) {
    for (const item of canastaStorage) {
      let contenedor = document.createElement("div");
      contenedor.className = "producto-canasta";
      contenedor.id = item.id;
      let botonElim = `buttonDel${item.id}`;
      let botonSum = `buttonAdd${item.id}`;
      let botonRest = `buttonRes${item.id}`;
      contenedor.innerHTML = `
                <div class="imagenProductoCanasta">
                <img src="${item.img}" alt="">
                </div>
                <p class="nombreCanasta">${item.nombre}</p>
                <p class="precioCanasta">$ ${item.precio * item.cantidad}</p>
                <p>Cantidad ${item.cantidad}</p>
                <button class="buttonAdd" id=${botonSum}>+</button>  
                <button class="buttonRes" id=${botonRest}>-</button>   
                <button class="buttonDel" id=${botonElim}>Eliminar</button>`;
      canasta.appendChild(contenedor);
      document.getElementById(botonSum).onclick = () => agregarACanasta(item);
      document.getElementById(botonRest).onclick = () => restarDeCanasta(item);
      document.getElementById(botonElim).onclick = () => deleteItem(contenedor.id);
    }
  }
};

// FUNCION AGREGAR ITEM A LA CANASTA

const agregarACanasta = (producto) => {
  let canasta = JSON.parse(localStorage.getItem("canasta"));
  let found = 0;
  if (canasta) {
    for (const item of canasta) {
      if (item.id == producto.id) {
        item.cantidad++;
        found = 1;
        break;
      }
    }
    if (found == 0) canasta.push({ ...producto, cantidad: 1 });
  } else {
    canasta = [{ ...producto, cantidad: 1 }];
  }
  Toastify({
    text: `Se agrego ${producto.nombre} x 1 al carrito`,
    duration: 1250,
    offset: {
      x: 150, 
      y: 10, 
    },
  }).showToast();
  localStorage.setItem("canasta", JSON.stringify(canasta));
  mostrarEnCanasta();
  botonDeVaciar();
};


// FUNCION RESTAR ITEM DE CANASTA

const restarDeCanasta = (producto) => {
  let canasta = JSON.parse(localStorage.getItem("canasta"));
  for (let i = 0; i < canasta.length; i++) {
    if (canasta[i].id == producto.id) {      
      if (canasta[i].cantidad > 1) { 
        canasta[i].cantidad--;
      } else { 
          if (producto.id == canasta[i].id) {
            canasta.splice(i, 1);
            break;
          }
      }
    }
  }
  Toastify({
    text: `Se elimino ${producto.nombre} x 1 del carrito`,
    duration: 1250,
    offset: {
      x: 150, 
      y: 10, 
    },
  }).showToast();
  localStorage.setItem("canasta", JSON.stringify(canasta));
  mostrarEnCanasta(); 
  botonDeVaciar();
};


// FUNCION BOTON ELIMINAR ITEM DE CANASTA

const deleteItem = (parametro) => {
  let canastaStorage = JSON.parse(localStorage.getItem("canasta"));
  for (let i = 0; i < canastaStorage.length; i++) {
    if (parametro == canastaStorage[i].id) {
      canastaStorage.splice(i, 1);
      break;
    }
  }
  Toastify({
    text: `Se elimino el producto del carrito`,
    duration: 1250,
    offset: {
      x: 150, 
      y: 10, 
    },
  }).showToast();
  localStorage.setItem("canasta", JSON.stringify(canastaStorage));
  mostrarEnCanasta();
  botonDeVaciar();
};



// FUNCION BOTON VACIAR CANASTA

const botonDeVaciar = () => {  
  if (canasta.innerHTML != "") {
    let botonBorrar = document.createElement("button");
    botonBorrar.id = "vaciarCanasta";
    botonBorrar.textContent = "¡Vaciar Canasta!";
    canasta.appendChild(botonBorrar);
    botonBorrar.onclick = () => { 
    Swal.fire({
      title: 'Estas seguro que quieres borrar todos los productos?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
          canasta.innerHTML = "";
          localStorage.removeItem("canasta");
          Swal.fire(
            'Se ha vaciado el carrito!', '', 'success')
        };
      })
    }
  }
};


// FUNCION BOTON CHECKOUT

document.getElementById("checkout").onclick = () => btnPagar();

const btnPagar = () => {
  let canastaStorage = JSON.parse(localStorage.getItem("canasta"));
  let total = 0;
    if (canastaStorage) {
      for (const item of canastaStorage) {
        total += item.cantidad * item.precio;
      }
    }
    if (total != 0) {
    Swal.fire({
      icon: 'warning',
      title: `El total es $ ${total}`,
      showDenyButton: true,
      confirmButtonText: 'Pagar',
      denyButtonText: `Continuar comprando`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Tu compra ha sido exitosa', '', 'success')
        canasta.innerHTML = "";
        localStorage.removeItem("canasta");
      } else if (result.isDenied) {
        Swal.close()
      }
    })
    } else {
      Swal.fire('¡Primero debes agregar algun producto!','','error')
    }
}
