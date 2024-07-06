const { createApp } = Vue
createApp({
    data() {
        return {
            transacciones: [],
            url: 'https://felixcanosa.pythonanywhere.com/transacciones',
            error: false,
            cargando: true,
            id: 0,
            id_transaccion:0,
            id_producto:0,
            nombre_usuario:'',
            nombre_producto:'',
            cantidad_producto:0,
            precio_total:0,
            hora_transaccion:'',

        }
    },
    methods: {
        fetchData(url) {
            this.cargando = true;
            this.error = false;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.transacciones = data;
                    this.cargando = false;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true;
                    this.cargando = false;
                })
        },


        

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