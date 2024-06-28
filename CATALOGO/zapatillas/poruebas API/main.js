const { createApp } = Vue;

createApp({
  data() {
    return {
      url: 'https://felixcanosa.pythonanywhere.com/productos',
      products: [],
      cart: [],
      searchQuery: '',
      gender: 'Todo',
      isModalOpen: false,
      selectedProduct: null,
      tipoProducto: 'zapatillas',
      compras: [],
    };
  },
  methods: {
    async fetchData() {
      try {
        let queryUrl = this.url;
        const params = [];
        

        if (this.gender !== 'Todo') {
          params.push(`genero=${encodeURIComponent(this.gender)}`);
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
          product.tipoProducto.toLowerCase().includes('zapatilla')
        );
        this.noProducts = this.products.length === 0;
      } catch (error) {
        console.error(`Error: ${error}`);
        this.noProducts = true;
      }
    },
    changeGender(gender) {
      this.gender = gender;
      this.fetchData();
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
      return this.compras.reduce((total, product) => total + product.price, 0);
    },
    getImageUrl(thumbnail) {
      return `path/to/your/images/${thumbnail}`;
    }
  },
  created() {
    this.fetchData();
  },
}).mount('#app');

let activarBotonGenero = null;
function activarBotonGeneros(a) {
  if(activarBotonGenero) {
    activarBotonGenero.classList.remove('activar');
  }
  a.classList.add('activar');
  activarBotonGenero = a;
}
