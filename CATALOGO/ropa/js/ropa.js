
/*
const { createApp } = Vue;

createApp({
  data() {
    return {
      url: 'https://felixcanosa.pythonanywhere.com/productos',
      productsAll: [],
      products: [],
      cart: [],
      searchQuery: '',
      gender: 'Todo',
      subCategory: '',
      isModalOpen: false,
      selectedProduct: null,
      compras: [],
      cantidad: 1,
    };
  },
  methods: {
    async changeGender(gender) {
      this.gender = gender;
      this.subCategory = '';  // Restablecer la subcategoría al cambiar de género
      await this.fetchData();
    },
    async changeSubCategory(subCategory) {
      this.subCategory = subCategory;
      await this.fetchData();
    },
    async fetchData() {
      try {
        let queryUrl = this.url;
        const params = [];

        if (this.gender !== 'Todo') {
          params.push(`genero=${encodeURIComponent(this.gender)}`);
        }
        if (this.subCategory) {
          params.push(`subCategoria=${encodeURIComponent(this.subCategory)}`);
        }
        if (this.searchQuery) {
          params.push(`nombre=${encodeURIComponent(this.searchQuery)}`);
        }

        if (params.length > 0) {
          queryUrl += '?' + params.join('&');
        }

        const response = await fetch(queryUrl);
        const data = await response.json();
        this.products = data.filter(product =>
          product.tipoProducto.toLowerCase().includes('ropa')
        );
        this.noProducts = this.products.length === 0;
      } catch (error) {
        console.error(`Error: ${error}`);
        this.noProducts = true;
      }
    },
    addToCart(product) {
      if (!this.cart.some(p => p.id === product.id)) {
        this.cart.push(product);
      }
    },
    addToCompras(product) {
      if (!this.compras.some(p => p.id === product.id)) {
        this.compras.push(product);
      }
    },

    removeFromCompras(product) {
      const index = this.compras.findIndex(p => p.id === product.id);
      if (index !== -1) {
        this.compras.splice(index, 1);
      }
    },
    toggleCompras(product) {
      if (this.compras.some(p => p.id === product.id)) {
        this.removeFromCompras(product);
      } else {
        this.addToCompras(product);
      }
    },
    
    /* compra de producto 
    comprar() {
      if (this.selectedProduct && this.cantidad > 0 && this.cantidad <= this.selectedProduct.stock) {
        this.realizarTransaccion(this.selectedProduct.id, this.cantidad);
        this.closeModal(); // Cierra la ventana emergente después de la compra
      } else {
        alert('Por favor, selecciona una cantidad válida.');
      }
    },

    realizarTransaccion(idProducto, cantidadProducto) {
      // Obtener datos del sessionStorage
      const isLogged = JSON.parse(sessionStorage.getItem('isLoged'));
      const idClienteLogeado = parseInt(sessionStorage.getItem('id_cliente_logeado'));

      // Verificar si el usuario está logueado
      if (isLogged) {
        // Crear el objeto de datos para la transacción
        const datosTransaccion = {
          cantidad_producto: cantidadProducto,
          id_producto: idProducto,
          usuario_id: idClienteLogeado
        };

        // Realizar la petición POST al servidor
        fetch('/transacciones', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datosTransaccion)
        })
        .then(response => response.json())
        .then(data => {
          console.log('Transacción exitosa:', data);
          alert('Compra realizada con éxito');
          // Aquí puedes agregar código para manejar una respuesta exitosa
        })
        .catch(error => {
          console.error('Error en la transacción:', error);
          alert('Error al realizar la compra');
          // Aquí puedes agregar código para manejar errores
        });
      } else {
        console.log('Usuario no logueado. No se puede realizar la transacción.');
        alert('Por favor, inicia sesión para realizar una compra');
        // Aquí puedes agregar código para manejar el caso de usuario no logueado
        window.location.href = "/LOGIN/login.html"; 
      }
    },


    showModal(product) {
      this.selectedProduct = product;
      this.isModalOpen = true;
      document.body.style.overflow = 'hidden';
    },
    closeModal() {
      this.isModalOpen = false;
      document.body.style.overflow = 'auto';
    },
    removeFromCart(index) {
      this.cart.splice(index, 1);
    },
    toggleColor(product) {
      product.isFavorite = !product.isFavorite;
      if (product.isFavorite) {
        this.addToCart(product);
      } else {
        const index = this.cart.findIndex(p => p.id === product.id);
        if (index !== -1) {
          this.removeFromCart(index);
        }
      }
    },
    totalPrice() {
      return this.compras.reduce((total, product) => total + product.precio, 0);
    },

    addToCompras(product) {
      const existingProduct = this.compras.find(p => p.id === product.id);
      if (existingProduct) {
        existingProduct.cantidad += 1;
      } else {
        this.compras.push({...product, cantidad: 1});
      }
    },

    /* funciones de carrito de compra para comprar 
    removeFromCompras(product) {
      const index = this.compras.findIndex(p => p.id === product.id);
      if (index !== -1) {
        this.compras.splice(index, 1);
      }
    },

    totalPrice() {
      return this.compras.reduce((total, product) => total + (product.precio * product.cantidad), 0);
    },

    realizarPedido() {
      const isLogged = JSON.parse(sessionStorage.getItem('isLoged'));
      const idClienteLogeado = parseInt(sessionStorage.getItem('id_cliente_logeado'));

      if (!isLogged) {
        alert('Por favor, inicia sesión para realizar una compra');
        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = "/LOGIN/login.html";
        return;
      }

      if (this.compras.length === 0) {
        alert('Tu carrito está vacío');
        return;
      }

      // Crear un array de promesas para cada transacción
      const transacciones = this.compras.map(product => 
        this.realizarTransaccion(product.id, product.cantidad)
      );

      // Ejecutar todas las transacciones
      Promise.all(transacciones)
        .then(() => {
          alert('Pedido realizado con éxito');
          this.compras = []; // Vaciar el carrito
          // Redirigir a una página de confirmación
         // window.location.href = "/pagina-de-confirmacion";
        })
        .catch(error => {
          console.error('Error al realizar el pedido:', error);
          alert('Hubo un error al procesar tu pedido. Por favor, intenta de nuevo.');
        });
    },

    realizarTransaccion(idProducto, cantidadProducto) {
      const idClienteLogeado = parseInt(sessionStorage.getItem('id_cliente_logeado'));

      const datosTransaccion = {
        cantidad_producto: cantidadProducto,
        id_producto: idProducto,
        usuario_id: idClienteLogeado
      };

      return fetch('/transacciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosTransaccion)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la transacción');
        }
        return response.json();
      });
    },


  },
  created() {
    this.fetchData();
  },
}).mount('#app');



var elem = document.querySelector('.gallery');
var flkty = new Flickity(elem, {
  // options
  cellAlign: 'left',
  contain: true,
  wrapAround: true,
  autoPlay: 5000
});

// cambia de color los botones de tipo de ropa.
let activarBoton = null;

function cambiarColor(button) {
  if (activarBoton) {
    activarBoton.classList.remove('active');
  }
  button.classList.add('active');
  activarBoton = button;
}

// mantener linea inferior de opciones genero.
let activarLinea = null;

function mantenerLinea(p) {
  if (activarLinea) {
    activarLinea.classList.remove('active');
  }
  p.classList.add('active');
  activarLinea = p;
}

// mantener color de fondo del buscador.
let activarfondo = null;

function manteneColorFondo(input) {
  if (activarfondo) {
    activarfondo.classList.remove('active');
  }
  input.classList.add('active');
  activarfondo = input;
}

let word = 'Ropa Deportiva'; //codigo para hacer el efecto comienzo del principio de la pagina
let container = document.getElementById('myID');

for (let i = 0; i < word.length; i++) {
  let span = document.createElement('span');
  span.textContent = word[i];
  span.style.animationDelay = `${i * 0.13}s`; //  velocidad de la animación
  container.appendChild(span);
}
*/

const { createApp } = Vue;

createApp({
  data() {
    return {
      url: 'https://felixcanosa.pythonanywhere.com/productos',
      productsAll: [],
      products: [],
      cart: [],
      searchQuery: '',
      gender: 'Todo',
      subCategory: '',
      isModalOpen: false,
      selectedProduct: null,
      compras: [],
      cantidad: 1,
    };
  },
  methods: {
    async changeGender(gender) {
      this.gender = gender;
      this.subCategory = '';
      await this.fetchData();
    },
    async changeSubCategory(subCategory) {
      this.subCategory = subCategory;
      await this.fetchData();
    },
    async fetchData() {
      try {
        let queryUrl = this.url;
        const params = [];

        if (this.gender !== 'Todo') {
          params.push(`genero=${encodeURIComponent(this.gender)}`);
        }
        if (this.subCategory) {
          params.push(`subCategoria=${encodeURIComponent(this.subCategory)}`);
        }
        if (this.searchQuery) {
          params.push(`nombre=${encodeURIComponent(this.searchQuery)}`);
        }

        if (params.length > 0) {
          queryUrl += '?' + params.join('&');
        }

        const response = await fetch(queryUrl);
        const data = await response.json();
        this.products = data.filter(product =>
          product.tipoProducto.toLowerCase().includes('ropa')
        );
        this.noProducts = this.products.length === 0;
      } catch (error) {
        console.error(`Error: ${error}`);
        this.noProducts = true;
      }
    },
    addToCart(product) {
      if (!this.cart.some(p => p.id === product.id)) {
        this.cart.push(product);
      }
    },
    addToCompras(product) {
      const existingProduct = this.compras.find(p => p.id === product.id);
      if (existingProduct) {
        existingProduct.cantidad += 1;
      } else {
        this.compras.push({...product, cantidad: 1});
      }
    },
    removeFromCompras(product) {
      const index = this.compras.findIndex(p => p.id === product.id);
      if (index !== -1) {
        this.compras.splice(index, 1);
      }
    },
    toggleCompras(product) {
      if (this.compras.some(p => p.id === product.id)) {
        this.removeFromCompras(product);
      } else {
        this.addToCompras(product);
      }
    },
    comprar() {
      if (this.selectedProduct && this.cantidad > 0 && this.cantidad <= this.selectedProduct.stock) {
        this.realizarTransaccion(this.selectedProduct.id, this.cantidad)
          .then(() => {
            this.closeModal();
            alert('Compra realizada con éxito');
          })
          .catch(error => {
            console.error('Error en la compra:', error);
            alert('Error al realizar la compra. Por favor, intenta de nuevo más tarde.');
          });
      } else {
        alert('Por favor, selecciona una cantidad válida.');
      }
    },
    realizarTransaccion(idProducto, cantidadProducto) {
      const isLoged = JSON.parse(sessionStorage.getItem('isLoged'));
      const idClienteLogeado = parseInt(sessionStorage.getItem('id_cliente_logeado'));
    
      if (!isLoged) {
        console.log('Usuario no logueado. No se puede realizar la transacción.');
        alert('Por favor, inicia sesión para realizar una compra');
        window.location.href = "/LOGIN/login.html";
        return Promise.reject('Usuario no logueado');
      }
    
      const datosTransaccion = {
        cantidad_producto: cantidadProducto,
        id_producto: idProducto,
        usuario_id: idClienteLogeado
      };
    
      console.log('Datos de la transacción:', datosTransaccion);
    
      return fetch('https://felixcanosa.pythonanywhere.com/transacciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosTransaccion)
      })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Transacción exitosa:', data);
        return data;
      })
      .catch(error => {
        console.error('Error en la transacción:', error);
        alert('Error al realizar la compra: ' + error.message);
        throw error;
      });
    },

    showModal(product) {
      this.selectedProduct = product;
      this.isModalOpen = true;
      document.body.style.overflow = 'hidden';
    },

    closeModal() {
      this.isModalOpen = false;
      document.body.style.overflow = 'auto';
    },

    removeFromCart(index) {
      this.cart.splice(index, 1);
    },
    
    toggleColor(product) {
      product.isFavorite = !product.isFavorite;
      if (product.isFavorite) {
        this.addToCart(product);
      } else {
        const index = this.cart.findIndex(p => p.id === product.id);
        if (index !== -1) {
          this.removeFromCart(index);
        }
      }
    },
    totalPrice() {
      return this.compras.reduce((total, product) => total + (product.precio * product.cantidad), 0);
    },
    realizarPedido() {
      const isLoged = JSON.parse(sessionStorage.getItem('isLoged'));

      if (!isLoged) {
        alert('Por favor, inicia sesión para realizar una compra');
        window.location.href = "/LOGIN/login.html";
        return;
      }

      if (this.compras.length === 0) {
        alert('Tu carrito está vacío');
        return;
      }

      const transacciones = this.compras.map(product => 
        this.realizarTransaccion(product.id, product.cantidad)
      );

      Promise.all(transacciones)
        .then(results => {
          console.log('Todas las transacciones exitosas:', results);
          alert('Pedido realizado con éxito');
          this.compras = [];
        })
        .catch(error => {
          console.error('Error al realizar el pedido:', error);
        });
    },
  },
  created() {
    this.fetchData();
  },
}).mount('#app');

// El resto de tu código (Flickity, funciones de cambio de color, etc.) permanece igual

var elem = document.querySelector('.gallery');
var flkty = new Flickity(elem, {
  // options
  cellAlign: 'left',
  contain: true,
  wrapAround: true,
  autoPlay: 5000
});

// cambia de color los botones de tipo de ropa.
let activarBoton = null;

function cambiarColor(button) {
  if (activarBoton) {
    activarBoton.classList.remove('active');
  }
  button.classList.add('active');
  activarBoton = button;
}

// mantener linea inferior de opciones genero.
let activarLinea = null;

function mantenerLinea(p) {
  if (activarLinea) {
    activarLinea.classList.remove('active');
  }
  p.classList.add('active');
  activarLinea = p;
}

// mantener color de fondo del buscador.
let activarfondo = null;

function manteneColorFondo(input) {
  if (activarfondo) {
    activarfondo.classList.remove('active');
  }
  input.classList.add('active');
  activarfondo = input;
}

let word = 'Ropa Deportiva'; //codigo para hacer el efecto comienzo del principio de la pagina
let container = document.getElementById('myID');

for (let i = 0; i < word.length; i++) {
  let span = document.createElement('span');
  span.textContent = word[i];
  span.style.animationDelay = `${i * 0.13}s`; //  velocidad de la animación
  container.appendChild(span);
}