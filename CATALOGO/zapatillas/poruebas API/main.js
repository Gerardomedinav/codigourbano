const { createApp } = Vue;

createApp({
  data() {
    return {
      url: 'https://api.mercadolibre.com/sites/MLA/search',
      productsAll: [],
      products: [],
      cart: [], //aca se almacenana los favoritos
      searchQuery: 'zapatillas de deporte, botines',
      buscador_zaptillaz: '',
      gender: 'Todo',

      isModalOpen: false, //  propiedad para controlar la visibilidad del modal
      selectedProduct: null, // una nueva propiedad para el producto seleccionado

      compras: [], //aca se almacenan las compras


    };
  },
  methods: {
    async fetchData(gender) {
      try {
        this.gender = gender;

        const response = await fetch(`${this.url}?q=${this.searchQuery} ${this.buscador_zaptillaz} ${gender !== 'Todo' ? gender : ''}`); //un filtrado simple
        const data = await response.json();
        this.productsAll = data.results;
        this.products = data.results;
      } catch (error) {
        alert(`Ups... se produjo un error: ${error}`);
      }
    },


    //es para agregar productos al carrito
    addToCompras(product) { //elimina un producto de la lista de compras. Recibe como parámetro el producto que se desea eliminar.
      if (!this.compras.includes(product)) {
        this.compras.push(product);
      }
    },

    removeFromCompras(product) {
      const index = this.compras.indexOf(product);
      if (index !== -1) {
        this.compras.splice(index, 1);
      }
    },
    toggleCompras(product) {
      if (this.compras.includes(product)) {
        this.removeFromCompras(product);
      } else {
        this.addToCompras(product);
      }
    },

    buyProduct() {
      alert('Has comprado el producto!');
    },

    showModal(product) { //muestra un modal con los detalles de un producto y deshabilita el desplazamiento de la página.
      this.selectedProduct = product;
      this.isModalOpen = true;

      document.body.style.overflow = 'hidden'; // Deshabilita el desplazamiento de la página
      
    },

    closeModal() {
      this.isModalOpen = false;

      document.body.style.overflow = 'auto'; // Habilita el desplazamiento nuevamente
    },
    
        // revisa si en el local Storage se encuentran productos favoritos y los agraga a cart.
        cardLocalStore() {
          // Obtener la lista actual de favoritos del localStorage
          const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

          // Comparar con los productos en el carrito (this.cart)
          favoritos.forEach((productoFavorito) => {
              // Verificar si el producto favorito no está en el carrito
              if (!this.cart.some((item) => item.id === productoFavorito.id)) {
                  // Agregar el producto favorito al carrito
                  this.cart.push(productoFavorito);
              }

              // Establecer product.isFavorite en true si está en favoritos
              const productIndex = this.cart.findIndex((item) => item.id === productoFavorito.id);
              if (productIndex !== -1) {
                  this.cart[productIndex].isFavorite = true;
              }
          });

          // Actualizar el localStorage con los productos del carrito
          localStorage.setItem('favoritos', JSON.stringify(this.cart));
      },


      addToCart(product) {
          this.cart.push(product);
          // Obtener la lista actual de favoritos o inicializarla si no existe
          const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
          // Verificar si el producto ya está en la lista de favoritos
          if (!favoritos.some((favProduct) => favProduct.id === product.id)) {
              favoritos.push(product);
              // Guardar la lista actualizada en localStorage
              localStorage.setItem('favoritos', JSON.stringify(favoritos));
          }
      },

      removeFromCart(index) { //remover de favoritos
          this.cart.splice(index, 1);

          // Obtener la lista actual de favoritos
          const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
          // Eliminar el producto de la lista
          if (index >= 0 && index < favoritos.length) {
              favoritos.splice(index, 1);
              // Guardar la lista actualizada en localStorage
              localStorage.setItem('favoritos', JSON.stringify(favoritos));
          }
      },


      // agregar o quitar corazon.
      toggleColor(product) {
          // Cambiar el estado de favorito
          product.isFavorite = !product.isFavorite;

          if (product.isFavorite) {
              this.addToCart(product);
          } else {
              const index = this.cart.indexOf(product);
              if (index !== -1) {
                  this.removeFromCart(index);

              }
          }
          localStorage.setItem('favoritos', JSON.stringify(this.cart));
      },

    

    totalPrice() {
      return this.compras.reduce((total, product) => total + product.price, 0);
    },

    getImageUrl(thumbnail) { //recibe como parámetro la miniatura de una imagen y retorna la URL de la imagen en tamaño completo.
      return thumbnail.replace(/\w\.jpg/gi, 'W.jpg');
    },
  },
  created() {
    this.fetchData(this.gender);
    this.cardLocalStore(); // Llama a la función cuando se carga la página
  },
}).mount('#app');


var elem = document.querySelector('.gallery');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true,
  wrapAround: true,
  autoPlay: 5000
});


let activarBotonGenero = null; //funcio para los botones de la seleccion de Genero
function activarBotonGeneros(a) {
    if(activarBotonGenero) {
      activarBotonGenero.classList.remove('activar');
    }
    a.classList.add('activar');
    activarBotonGenero = a;
}

