const { createApp } = Vue
createApp({
    data() {
        return {
            usuarios: [],
            url: 'https://felixcanosa.pythonanywhere.com/usuarios',
            error: false,
            cargando: true,
            id: 0,
            nombre: "",
            contrasena: "",
            email: "",
            tipoUsuario: "",
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
                    this.usuarios = data;
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

            // Verificar si todos los campos requeridos están llenos
            if (!this.nombre || !this.contrasena || !this.email || !this.tipo_usuario) {
                alert("Por favor, complete todos los campos obligatorios.");
                return;
            }
            
            let usuario = {
                nombre: this.nombre,
                contrasena: this.contrasena,
                email: this.email,
                tipo_usuario: this.tipoUsuario ? 0 : 1
            }
            console.log(usuario);
            var options = {
                body: JSON.stringify(usuario),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "./usuarios.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")
                })
        },

        buscar() {
            if (this.campoBusqueda && this.valorBusqueda) {
                let url = new URL(this.url);
                url.searchParams.append(this.campoBusqueda, this.valorBusqueda);
                this.fetchData(url);
            } else {
                this.fetchData(this.url);
            }
        },

        /*
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
        */
    },
    created() {
        this.fetchData(this.url);

    },
}).mount('#app')

function cerrarSesion() {
    sessionStorage.removeItem('isLoged');
    sessionStorage.removeItem('id_cliente_logeado');
    // Redirigir a la página de login o a la página principal
    window.location.href = "../../LOGIN/login.html";
}