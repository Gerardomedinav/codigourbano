const { createApp } = Vue

createApp({
    data() {
        return {
            id: null,
            nombre: "",
            email: "",
            contrasena: "",
            url: 'https://felixcanosa.pythonanywhere.com/usuarios/'
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.id = data.id
                    this.nombre = data.nombre
                    this.email = data.email
                    this.contrasena = data.contrasena
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al cargar los datos del usuario");
                })
        },
        modificar() {
            const usuario = {
                nombre: this.nombre,
                email: this.email,
                contrasena: this.contrasena
            }

            var options = {
                body: JSON.stringify(usuario),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }

            fetch(this.url + this.id, options)
                .then(response => response.json())
                .then(data => {
                    alert("Usuario modificado")
                    window.location.href = "./Cliente.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })
        }
    },
    created() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (id) {
            this.fetchData(this.url + id)
        }
    },
}).mount('#app')