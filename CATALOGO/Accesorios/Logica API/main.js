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

// ... código para los efectos visuales ...


let word = 'Accesorios'; //codigo para hacer el efecto comienzo del principio de la pagina
let container = document.getElementById('myID');

for(let i = 0; i < word.length; i++) {
  let span = document.createElement('span');
  span.textContent = word[i];
  span.style.animationDelay = `${i * 0.13}s`; //  velocidad de la animación
  container.appendChild(span);
}

let activarBotonGenero = null; //funcio para los botones de la seleccion de Genero
function activarBotonGeneros(a) {
    if(activarBotonGenero) {
      activarBotonGenero.classList.remove('activar');
    }
    a.classList.add('activar');
    activarBotonGenero = a;
}



let activarBoton = null; //funcio para los botones de la seleccion de SupGenero
function cambiarColor(button) {
    if(activarBoton) {
        activarBoton.classList.remove('active');
    }
    button.classList.add('active');
    activarBoton = button;
}




