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
      favorites: {},
      debouncedFetchData: null,
    };
  },
  methods: {
async changeGender(gender) {
  this.gender = gender;
    if (this.gender == "Todo"){
      this.subCategory = '';  
    }
  await this.fetchData();
},
async changeSubCategory(subCategory) {
  this.subCategory = subCategory;
  await this.fetchData();
},
debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
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
        // Actualizar el stock después de una transacción exitosa
        return this.actualizarStock(idProducto, cantidadProducto);
      })
      .catch(error => {
        console.error('Error en la transacción:', error);
        alert('Error al realizar la compra: ' + error.message);
        throw error;
      });
      

    },
    actualizarStock(idProducto, cantidadComprada) {
      const url = `https://felixcanosa.pythonanywhere.com/productos/${idProducto}`;
      
      return fetch(url)
        .then(response => response.json())
        .then(producto => {
          const nuevoStock = Math.max(producto.stock - cantidadComprada, 0);
          
          return fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stock: nuevoStock })
          });
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al actualizar el stock');
          }
          return response.json();
        })
        .then(productoActualizado => {
          console.log('Stock actualizado:', productoActualizado);
          this.actualizarStockEnUI(idProducto, productoActualizado.stock);
          return productoActualizado;
        });
    },
    
    actualizarStockEnUI(idProducto, nuevoStock) {
      const producto = this.products.find(p => p.id === idProducto);
      if (producto) {
        producto.stock = nuevoStock;
        if (nuevoStock === 0) {
          producto.agotado = true;
        }
      }
    
      if (this.selectedProduct && this.selectedProduct.id === idProducto) {
        this.selectedProduct.stock = nuevoStock;
        if (nuevoStock === 0) {
          this.selectedProduct.agotado = true;
        }
      }
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
      this.toggleFavorite(product);
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
    handleImageError(event) {
      event.target.src = '../../img/product-default.png';
    },
    /* Metodos para control de favoritos y gaurdado en Local Storage de los mismos*/ 
    toggleFavorite(product) {
      const userId = this.getCurrentUserId();
      if (!userId) {
        this.showLoginModal();
        return;
      }
    
      if (!this.favorites[userId]) {
        this.favorites[userId] = [];
      }
    
      const index = this.favorites[userId].findIndex(p => p.id === product.id);
      if (index === -1) {
        this.favorites[userId].push(product);
      } else {
        this.favorites[userId].splice(index, 1);
      }
    
      this.saveFavoritesToLocalStorage();
      product.isFavorite = !product.isFavorite;
    },
    
  
    isFavorite(product) {
      const userId = this.getCurrentUserId();
      if (!userId || !this.favorites[userId]) return false;
      return this.favorites[userId].some(p => p.id === product.id);
    },
  
    saveFavoritesToLocalStorage() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
  
    loadFavoritesFromLocalStorage() {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        this.favorites = JSON.parse(storedFavorites);
      }
    },
  
    getCurrentUserId() {
      const isLoged = JSON.parse(sessionStorage.getItem('isLoged'));
      return isLoged ? sessionStorage.getItem('id_cliente_logeado') : null;
    },
    showLoginModal() {
      // Aquí se puede implementar la lógica para una ventana emergente
      alert("Por favor, regístrate o inicia sesión para guardar productos en favoritos.");
      // Opcionalmente, se puede redirigir al usuario a la página de inicio de sesión
      // window.location.href = "/LOGIN/login.html";
    },

  },
  created() {
    this.fetchData();
    this.loadFavoritesFromLocalStorage();
    this.debouncedFetchData = this.debounce(this.fetchData, 300)
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