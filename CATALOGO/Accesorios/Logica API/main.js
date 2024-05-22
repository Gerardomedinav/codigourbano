const { createApp } = Vue;

createApp({
  data() {
    return {
      url: 'https://api.mercadolibre.com/sites/MLA/search',
      productsAll: [],
      products: [],
      cart: [],
      searchQuery: 'ropa deportiva',
      buscador_zaptillaz: '',
      gender: 'Todo',
      subCategory: '',

      isModalOpen: false, //  propiedad para controlar la visibilidad del modal
      selectedProduct: null, // Agrega una nueva propiedad para el producto seleccionado

      mouseX: 0,
      mouseY: 0,

      compras: [], //aca se almacenan las compras


    };
  },
  methods:{
    async changeGender(gender) {
      this.gender = gender;
      await this.fetchData();
    },
    async changeSubCategory(subCategory) {
      this.subCategory = subCategory;
      await this.fetchData();
    },
    async fetchData() {
      try {
        const response = await fetch(`${this.url}?q=${this.searchQuery} ${this.buscador_zaptillaz} ${this.gender !== 'Todo' ? this.gender : ''} ${this.subCategory}`);
        const data = await response.json();
        this.productsAll = data.results;
        this.products = data.results;
      } catch (error) {
        alert(`Ups... se produjo un error: ${error}`);
      }
    },


    addToCart(product) {
      this.cart.push(product);
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

    removeFromCart(index) { //remover de favoritos
      this.cart.splice(index, 1);
    },

    toggleColor(product) { //funcionalidad de agregar y sacar corazon
      product.isFavorite = !product.isFavorite;
  
      if (product.isFavorite) {
        this.addToCart(product);
      } else {
        const index = this.cart.indexOf(product);
        if (index !== -1) {
          this.removeFromCart(index);
        }
      }
    },


    

    totalPrice() {
      return this.cart.reduce((total, product) => total + product.price, 0);
    },
    getImageUrl(thumbnail) {
      return thumbnail.replace(/\w\.jpg/gi, 'W.jpg');
    },
  },
  created() {
    this.fetchData(this.gender, this.subCategory);
  },
}).mount('#app');




