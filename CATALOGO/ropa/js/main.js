const { createApp } = Vue;

createApp({
    data() {
        return {
            url: 'https://api.mercadolibre.com/sites/MLA/search',
            productsAll: [],
            products: [],
            cart: [],
            searchQuery: 'Sportswear ropa deportiva ',
            selectorRopa: '',
            gender: 'todo',


            isModalOpen: false, //  propiedad para controlar la visibilidad del modal
            selectedProduct: null, // Agrega una nueva propiedad para el producto seleccionado

            mouseX: 0,
            mouseY: 0,


        };
    },
    methods: {
        async changeGender(gender){
            this.gender = gender;
            await this.fetchData();
        },
        async changeRopa(selectorRopa) {
            this.selectorRopa = selectorRopa; 
            await this.fetchData();
        },

        async fetchData() {
            try {
                const response = await fetch(`${this.url}?q=${this.searchQuery} ${this.selectorRopa} ${this.gender !== 'todo' ? this.gender : ''}`);
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

        buyProduct() {
            alert('Has comprado el producto!');
        },

        showModal(product) {
            this.selectedProduct = product;
            this.isModalOpen = true;

            //document.body.style.overflow = 'hidden'; // Deshabilita el desplazamiento de la página

        },

        closeModal() {
            this.isModalOpen = false;

            //document.body.style.overflow = 'auto'; // Habilita el desplazamiento nuevamente
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
        this.fetchData(this.gender);
    },
}).mount('#app');



let botonActivo = null;

function cambiarColor(boton) {
    if (botonActivo) {
        botonActivo.classList.remove("active");
    }
    boton.classList.add("active");
    botonActivo = boton;
}

const tarjeta = document.getElementById("miTarjeta");
const contenido = tarjeta.textContent;
const longitudMaxima = 100; // Establece la longitud máxima deseada

if (contenido.length > longitudMaxima) {
    tarjeta.textContent = contenido.slice(0, longitudMaxima) + "...";
}


