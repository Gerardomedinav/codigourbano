

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
      cantidadSeleccionada: 1,
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
    removeFromCart(index) {
      const removedProduct = this.cart[index];
      this.cart.splice(index, 1);
      
      // Encuentra el producto en la lista completa de productos y actualiza su estado
      const productInList = this.products.find(p => p.id === removedProduct.id);
      if (productInList) {
        productInList.isFavorite = false;
      }
    },
    toggleCompras(product, cantidad) {
      if (!product) return;
      const index = this.compras.findIndex(p => p.id === product.id);
      if (index !== -1) {
        // Si ya está en el carrito, actualiza la cantidad o elimínalo si la cantidad es 0
        if (cantidad > 0) {
          this.compras[index].cantidad = cantidad;
        } else {
          this.compras.splice(index, 1);
        }
      } else {
        // Si no está en el carrito y la cantidad es mayor que 0, añádelo
        if (cantidad > 0) {
          this.compras.push({...product, cantidad: cantidad});
        }
      }
      this.closeModal();
    },
    isInCompras(product) {
      return this.compras.some(p => p.id === product.id);
    },
    comprar() {
      if (this.selectedProduct && this.cantidadSeleccionada > 0 && this.cantidadSeleccionada <= this.selectedProduct.stock) {
        this.realizarTransaccion(this.selectedProduct.id, this.cantidadSeleccionada)
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
      this.selectedProduct = {...product};
      this.cantidadSeleccionada = 1; // Reinicia la cantidad
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
      document.body.style.overflow = 'auto';
    },

    removeFromCompras(product) {
      const index = this.compras.findIndex(p => p.id === product.id);
      if (index !== -1) {
        this.compras.splice(index, 1);
      }
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