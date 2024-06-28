const { createApp } = Vue
createApp({
    data() {
        return {
            productos: [],
            url: 'http://127.0.0.1:5000/productos',
            error: false,
            cargando: true,
            id: 0,
            nombre: "",
            imagen: "",
            stock: 0,
            tipoProducto: "",
            precio: 0,
            marca:"",
            origen:"",
            tiposFiltro: [],
            tipoSeleccionado: ""
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
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
                marca: this.marca,
                stock: this.stock,
                tipoProducto: this.tipoProducto,
                imagen: this.imagen,
                origen: this.origen
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
        filtrarPorTipo() {
            if (this.tipoSeleccionado) {
                this.fetchData(`${this.url}?tipo=${this.tipoSeleccionado}`);
            } else {
                this.fetchData(this.url);
            }
        },
        obtenerTipos() {
            fetch(`${this.url}/tipos`)
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