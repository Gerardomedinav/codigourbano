const { createApp } = Vue

createApp({
    data() {
        return {
            clientes: [],
            transacciones: [],
            urlClientes: 'https://felixcanosa.pythonanywhere.com/usuarios',
            urlTransacciones: 'https://felixcanosa.pythonanywhere.com/transacciones',
            error: false,
            cargando: true,
            id: 0,
            nombre: "",
            contrasena: "",
            email: "",
            campoBusqueda: '',
            valorBusqueda: '',
        }
    },
    methods: {
        fetchData(url, dataType) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (dataType === 'clientes') {
                        this.clientes = data;
                        console.log('Clientes cargados:', this.clientes);
                    } else if (dataType === 'transacciones') {
                        this.transacciones = data;
                        console.log('Transacciones cargadas:', this.transacciones);
                    }
                    this.cargando = false;
                })
                .catch(err => {
                    console.error('Error al cargar datos:', err);
                    this.error = true;
                    this.cargando = false;
                })
        },
        eliminarCliente(id) {
            const url = this.urlClientes + '/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text())
                .then(res => {
                    alert('Cliente Eliminado')
                    this.fetchData(this.urlClientes, 'clientes');
                })
                .catch(err => {
                    console.error('Error al eliminar cliente:', err);
                    alert('Error al eliminar cliente');
                })
        },
        grabarCliente() {
            if (!this.nombre || !this.contrasena || !this.email) {
                alert("Por favor, complete todos los campos obligatorios.");
                return;
            }
            
            let cliente = {
                nombre: this.nombre,
                contrasena: this.contrasena,
                email: this.email,
                tipo_usuario: 1
            }
            
            var options = {
                body: JSON.stringify(cliente),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.urlClientes, options)
                .then(response => response.json())
                .then(data => {
                    alert("Cliente registrado con éxito")
                    this.nombre = "";
                    this.contrasena = "";
                    this.email = "";
                    this.fetchData(this.urlClientes, 'clientes');
                })
                .catch(err => {
                    console.error('Error al grabar cliente:', err);
                    alert("Error al Grabar")
                })
        },
        buscar() {
            if (this.campoBusqueda && this.valorBusqueda) {
                let url = new URL(this.urlClientes);
                url.searchParams.append(this.campoBusqueda, this.valorBusqueda);
                this.fetchData(url, 'clientes');
            } else {
                this.fetchData(this.urlClientes, 'clientes');
            }
        },
    },
    created() {
        this.fetchData(this.urlClientes, 'clientes');
        this.fetchData(this.urlTransacciones, 'transacciones');
    },
}).mount('#app')