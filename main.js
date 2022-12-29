const juegos = [
    {
        nombre: 'Resident Evil',
        id: 1,
        genre: 'Survival Horror',
        price: 250,
        imgUrl: 'http://2.bp.blogspot.com/-c3zVpbk5tfA/VL0mieXksvI/AAAAAAAAQtQ/4uVyCxqPN6k/s1600/resident-evil.jpg'
    },
    {
        nombre: "Uncharted 3: Drake's deception",
        id: 2,
        genre: 'Accion-aventura',
        price: 1200,
        imgUrl: "https://www.hd-tecnologia.com/imagenes/articulos/2019/08/Aqu%C3%AD-est%C3%A1n-Uncharted-3-y-The-Last-Of-Us-corriendo-en-PC-con-la-%C3%BAltima-versi%C3%B3n-de-RPCS3.jpg"
    },
    {
        nombre: 'Devil May Cry 3',
        id: 3,
        genre: 'Hack n slash',
        price: 1300,
        imgUrl: "https://i.ytimg.com/vi/1dXTpeANgGo/maxresdefault.jpg"
    },
    {
        nombre: 'Resident Evil 4',
        id: 4,
        genre: 'Survival Horror' + ', ' + 'Accion',
        price: 650,
        imgUrl: "https://phantom-marca.unidadeditorial.es/0e25d0867963f4f5a53e49fd57f28cc3/resize/1320/f/jpg/assets/multimedia/imagenes/2021/09/27/16327451990851.jpg"
    },
    {
        nombre: "God Of War",
        id: 5,
        genre: 'Hack n Slash' + ', ' + 'Puzzles',
        price: 6200,
        imgUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1593500/capsule_616x353.jpg?t=1642526157"
    },
    {
        nombre: 'Call Of Duty: Modern Warfare 2',
        id: 6,
        genre: 'fps',
        price: 4500,
        imgUrl: "https://phantom-marca.unidadeditorial.es/5a63ce6030006c77945628d0d67c426c/resize/1320/f/jpg/assets/multimedia/imagenes/2022/06/07/16546329958064.jpg"
    },
    {
        nombre: 'The Witcher 3: Wild Hunt',
        id: 7,
        genre: 'Mundo abierto' + ', ' + 'Rpg',
        price: 950,
        imgUrl: "https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg?t=1668443314"
    },
    {
        nombre: "The Elders Scrolls V: Skyrim",
        id: 8,
        genre: 'Mundo abierto' + ', ' + 'Rpg',
        price: 1200,
        imgUrl: "https://cdn.akamai.steamstatic.com/steam/apps/489830/header.jpg?t=1650909796"
    },
    {
        nombre: 'Hollow Knight',
        id: 9,
        genre: 'Metroidvania',
        price: 400,
        imgUrl: "https://cdn.akamai.steamstatic.com/steam/apps/367520/capsule_616x353.jpg?t=1667006028"
    },
    {
        nombre: 'The Forest',
        id: 10,
        genre: 'Terror' + ', ' + 'Supervivencia',
        price: 600,
        imgUrl: "https://i.ytimg.com/vi/6R9zo30Vpao/maxresdefault.jpg"
    },


]
let carrito = []

function renderCatalogo() {
    let juegosContainer = document.getElementById('juegosContainer')
    juegos.map(x => {
        juegosContainer.innerHTML += `
        <div class="card">
        <img class="card-img-top" src="${x.imgUrl}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${x.nombre}</h5>
          <p class="card-text">$${x.price}</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          <button class="btn btn-outline-success" id=${x.id} type="button" onclick=agregarAlCarrito(this)>Agregar al carrito</button>
        </div>
      </div>
        `
    })
}

function buscar() {
    let buscador = document.getElementById('buscador')
    let juegosFiltrados = juegos.filter(juego => juego.nombre.toLowerCase().includes(buscador.value) || juego.genre.toLowerCase().includes(buscador.value))
    juegosContainer.innerHTML = ""
    juegosFiltrados.map(x => {
        juegosContainer.innerHTML += `
        <div class="card">
        <img class="card-img-top" src="${x.imgUrl}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${x.nombre}</h5>
          <p class="card-text">$${x.price}</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          <button class="btn btn-outline-success" id=${x.id} type="button" onclick=agregarAlCarrito(this)>Agregar al carrito</button>
        </div>
      </div>
        `
    })
}

function irAlCarrito() {
    window.location.href = "./carrito.html"
}

function renderCarrito() {
    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"))
    }
    let carritoContainer = document.getElementById("carritoContainer")
    if (carrito.length == 0) {
        carritoContainer.innerHTML =
            `<h5>Su carrito se encuentra vacio</h5>`
    } else {
        carrito.map(x => {
            carritoContainer.innerHTML += `
        <div class="card">
        <img class="card-img-top" src="${x.imgUrl}" alt="Card image cap"> 
        <div class="card-body">
          <h5 class="card-title">${x.nombre}</h5>
          <p class="card-text">$${x.precioUnitario}</p>
          <p class="card-text">${x.unidades} unidad/es</p>
          <p class="card-text">Subtotal $${x.subtotal}</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          <button class="btn btn-outline-danger" id=${x.id} type="button" onclick=quitarDelCarrito(this)>Quitar del carrito</button>
        </div>
      </div>
        `
        })
        let total = carrito.reduce((acc, valorActual) => acc + valorActual.subtotal, 0)
        carritoContainer.innerHTML += `
          <h3>TOTAL $${total}</h3>
          <button type="button" class="btn btn-outline-dark" onclick=comprar(${total})>Comprar</button>
          `
    }
    contadorCarrito()
}

function agregarAlCarrito(e) {
    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"))
    }
    let juegoBuscado = juegos.find(juego => juego.id == e.id)
    let posicionJuegoBuscado = carrito.findIndex(juego => juego.id == juegoBuscado.id)
    if (posicionJuegoBuscado != -1) {
        carrito[posicionJuegoBuscado].unidades++
        carrito[posicionJuegoBuscado].subtotal = carrito[posicionJuegoBuscado].unidades * carrito[posicionJuegoBuscado].precioUnitario
    } else {
        carrito.push({ id: juegoBuscado.id, nombre: juegoBuscado.nombre, precioUnitario: juegoBuscado.price, unidades: 1, subtotal: juegoBuscado.price, imgUrl: juegoBuscado.imgUrl })
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    console.log(carrito)
    contadorCarrito()
}

function quitarDelCarrito(e) {
    carrito = JSON.parse(localStorage.getItem("carrito"))
    let posicionJuegoBuscado = carrito.findIndex(juego => juego.id == e.id)
    if (posicionJuegoBuscado != -1) {
        if (carrito[posicionJuegoBuscado].unidades > 1) {

            carrito[posicionJuegoBuscado].unidades--
            carrito[posicionJuegoBuscado].subtotal = carrito[posicionJuegoBuscado].unidades * carrito[posicionJuegoBuscado].precioUnitario

        } else {
            carrito.splice(posicionJuegoBuscado, 1)
        }
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    window.location.reload()
    contadorCarrito()
}

function comprar(total) {
    alert("Usted abonará un total de $" + total)
    limpiarCarrito()
    window.location.reload()
}

function limpiarCarrito() {
    localStorage.setItem("carrito", "")
}

function contadorCarrito() {
    total = carrito.reduce((acc, valorActual) => acc + valorActual.unidades, 0)
    
    document.getElementById("contadorCarrito").innerHTML =
    ` ${total}`
}