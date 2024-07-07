const { createApp } = Vue

createApp({
    data() {
        return {
            cliente: null,
            transacciones: [],
            urlClientes: 'https://felixcanosa.pythonanywhere.com/usuarios',
            urlTransacciones: 'https://felixcanosa.pythonanywhere.com/transacciones',
            error: false,
            cargando: true,
        }
    },
    methods: {
        fetchClienteData() {
            const clienteId = sessionStorage.getItem('id_cliente_logeado');
            if (!clienteId) {
                this.error = true;
                this.cargando = false;
                return;
            }

            fetch(`${this.urlClientes}/${clienteId}`)
                .then(response => response.json())
                .then(data => {
                    this.cliente = data;
                    this.fetchTransaccionesData();
                })
                .catch(err => {
                    console.error('Error al cargar datos del cliente:', err);
                    this.error = true;
                    this.cargando = false;
                })
        },
        fetchTransaccionesData() {
            if (!this.cliente) return;

            fetch(this.urlTransacciones)
                .then(response => response.json())
                .then(data => {
                    // Filtrar las transacciones para mostrar solo las del cliente actual
                    this.transacciones = data.filter(t => t.nombre_usuario === this.cliente.nombre);
                    this.cargando = false;
                })
                .catch(err => {
                    console.error('Error al cargar transacciones:', err);
                    this.error = true;
                    this.cargando = false;
                })
        },
        cerrarSesion() {
            sessionStorage.removeItem('isLoged');
            sessionStorage.removeItem('id_cliente_logeado');
            window.location.href = "/LOGIN/login.html";
        },
    },
    created() {
        const isLoged = sessionStorage.getItem('isLoged') === 'true';
        const clienteId = sessionStorage.getItem('id_cliente_logeado');
        if (!isLoged || !clienteId) {
            window.location.href = "/LOGIN/login.html";
            return;
        }
        this.fetchClienteData();
    }
}).mount('#app')