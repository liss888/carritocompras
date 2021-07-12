const aplicacion = document.querySelector('.container')

const url = 'http://www.omdbapi.com/?i=tt3896198&apikey=98f2595b'
fetch(url)
    .then(res => res.json())
    .then(data => {

        let element = document.getElementById('elem')
        element.innerHTML = `
        <p>${data.Title}</p>
        <img src= '${data.Poster}'/>
        
        `
        console.log(data)
    })


.catch(err => console.log(err))




const baseDeDatos = [{
        id: 1,
        nombre: 'Promo 1: 1 pop grande mas 2 bebidas medianas',
        descripcion: "1 pop grande mas 2 bebidas medianas",
        precio: 4000,
    },
    {
        id: 2,
        nombre: 'Promo 2: 1 Balde Home + 2 bebidas medianas',
        precio: 5500,
    },
    {
        id: 3,
        nombre: 'Promo 3: 1 Box Pop + 2 bebidas medianas + 2 Lays bolsa',
        precio: 6000,
    },
    {
        id: 4,
        nombre: 'Promo 4: Nachos con Queso + 1 bebida pequeña',
        precio: 5000,
    }

];

let carrito = [];
let total = 0;
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        const miNodo = document.createElement('div');
        miNodo.classList.add;
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add;
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add;
        miNodoTitle.textContent = info.nombre;
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add;
        miNodoImagen.setAttribute('src', info.imagen);
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add;
        miNodoPrecio.textContent = info.precio + '$';
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

function anyadirProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
    calcularTotal();
    renderizarCarrito();

}

function renderizarCarrito() {
    DOMcarrito.textContent = '';
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);
        const miNodo = document.createElement('li');
        miNodo.classList.add;
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}€`;
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
}

function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    renderizarCarrito();
    calcularTotal();
}

function calcularTotal() {

    total = 0;
    carrito.forEach((item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        total = total + miItem[0].precio;
    });
    DOMtotal.textContent = total.toFixed(2);
}


function vaciarCarrito() {

    carrito = [];

    renderizarCarrito();
    calcularTotal();
}

DOMbotonVaciar.addEventListener('click', vaciarCarrito);

renderizarProductos();