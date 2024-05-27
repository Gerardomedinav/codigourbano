const { createApp } = Vue;

createApp({
    data() {
        return {
            url: 'https://api.mercadolibre.com/sites/MLA/search',
            productsAll: [],
            products: [],
            cart: [], // se guardan los favoritos.
            searchQuery: 'Sportswear ropa deportiva', // Filtro 
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

// pruebas con LocalStorage
//localStorage.clear();

//let usuario = {id:1, nombre:'Alberto', edad:60, genero: 'hombre'};

//let cuenta = localStorage.setItem('cuenta', JSON.stringify(usuario)); //crea un item en el localStore y lo transforma en string.
//onsole.log(localStorage.getItem('cuenta'));
//let cuentaJson = console.log(JSON.parse(localStorage.getItem('cuenta')));