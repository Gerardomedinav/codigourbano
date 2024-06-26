const { createApp } = Vue
createApp({
    data() {
        return {
            productos: [],
            url: 'https://felixcanosa.pythonanywhere.com/productos',
            error: false,
            cargando: true,
            id: 0,
            nombre: "",
            imagen: "",
            stock: 0,
            tipoProducto: "",
            precio: 0,
            tiposFiltro: [],
            tipoSeleccionado: "",
            campoBusqueda: '',
            valorBusqueda: '',
        }
    },
    methods: {
        fetchData(url) {
            this.cargando = true;
            this.error = false;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    this.cargando = false;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true;
                    this.cargando = false;
                })
        },
        eliminar(id) {
            const url = this.url + '/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text())
                .then(res => {
                    alert('Registro Eliminado')
                    location.reload();
                })
        },
        grabar() {
            let producto = {
                nombre: this.nombre,
                precio: this.precio,
                stock: this.stock,
                tipoProducto: this.tipoProducto,
                imagen: this.imagen
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "./productos.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")
                })
        },

        buscar(){
            let url = this.url;
            if (this.campoBusqueda && this.valorBusqueda) {
                url += `?${this.campoBusqueda}=${this.valorBusqueda}`;
            }
            this.fetchData(url);
        },

        filtrarPorTipo() {
            let url = this.url;
            if (this.tipoSeleccionado) {
                url += `?tipoProducto=${this.tipoSeleccionado}`;
            }
            this.fetchData(url);
        },
        obtenerTipos() {
            fetch(this.url + '/tipos')
                .then(response => response.json())
                .then(data => {
                    this.tiposFiltro = data;
                })
                .catch(err => {
                    console.error(err);
                })
        }
        
    },
    created() {
        this.fetchData(this.url);
        this.obtenerTipos();
    },
}).mount('#app')