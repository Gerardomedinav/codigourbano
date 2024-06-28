/*
const { createApp } = Vue;

createApp({
    data() {
        return {
            //url: 'https://api.mercadolibre.com/sites/MLA/search',
            url:'https://felixcanosa.pythonanywhere.com/productos',
            productsAll: [],
            products: [],
            cart: [], // se guardan los favoritos.
            searchQuery: '',  
            selectorRopa: 'Todo',
            gender: 'todo',

            isModalOpen: false, //  propiedad para controlar la visibilidad del modal
            selectedProduct: null, // Agrega una nueva propiedad para el producto seleccionado
            compras: [], //acá se almacenan las compras


        };
    },
    methods: {
        async changeGender(gender) {
            this.gender = gender;
            await this.fetchData(); // se llama a la función fetchdata() y se espera hasta que este termine para seguir.
        },
        async changeRopa(selectorRopa) {
            this.selectorRopa = selectorRopa;
            await this.fetchData();
        },

        async fetchData() {
            try {
                const response = await fetch(`${this.url}?q=${this.searchQuery} ${this.selectorRopa} ${this.gender !== 'todo' ? this.gender : ''}`);
                //const response = await fetch(url);
                const data = await response.json();
                this.productsAll = data.results;
                this.products = data.results;
            } catch (error) {
                alert(`Ups... se produjo un error: ${error}`);
            }
        },




        //es para agregar productos al carrito
        addToCompras(product) {
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

        showModal(product) {
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

        getImageUrl(thumbnail) {
            return thumbnail.replace(/\w\.jpg/gi, 'W.jpg');
        },





    },
    created() {
        this.fetchData(this.gender);
        this.cardLocalStore(); // Llama a la función cuando se carga la página
    },
}).mount('#app');

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
        this.products = data;
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
    buyProduct() {
      alert('Has comprado el producto!');
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

for(let i = 0; i < word.length; i++) {
  let span = document.createElement('span');
  span.textContent = word[i];
  span.style.animationDelay = `${i * 0.13}s`; //  velocidad de la animación
  container.appendChild(span);
}
