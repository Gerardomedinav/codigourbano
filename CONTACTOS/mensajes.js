document.addEventListener('DOMContentLoaded', function() {
    // Inicializar sessionStorage si no está ya inicializado
    if (!sessionStorage.getItem('isLoged')) {
        sessionStorage.setItem('isLoged', 'false');
        sessionStorage.setItem('id_cliente_logeado', 'null');
    }

    new Vue({
        el: '#app',
        data() {
            return {
                comentarios: [],
                url: 'https://felixcanosa.pythonanywhere.com/comentarios',
                error: false,
                cargando: true,
                nombre: '',
                email: '',
                mensaje: '',
                genero: '',
                pais: '',
            }
        },
        methods: {
            validarFormulario() {
                if (!this.nombre || !this.email || !this.mensaje || !this.genero || !this.pais) {
                    alert('Rellene todos los campos antes de enviar su mensaje.');
                    return false;
                }
                return true;
            },
            guardarComentario() {
                if (!this.validarFormulario()) {
                    return;
                }

                const isLoged = sessionStorage.getItem('isLoged') === 'true';
                const id_cliente_logeado = sessionStorage.getItem('id_cliente_logeado');
                
                const comentario = {
                    nombre: this.nombre,
                    email: this.email,
                    mensaje: this.mensaje,
                    genero: this.genero,
                    pais: this.pais,
                    id_usuario: isLoged ? id_cliente_logeado : null
                };

                console.log('Datos a enviar:', comentario);

                var options = {
                    body: JSON.stringify(comentario),
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    redirect: 'follow'
                };

                fetch(this.url, options)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok ' + response.statusText);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Respuesta del servidor:', data);
                        this.comentarios.push(data);
                        this.nombre = '';
                        this.email = '';
                        this.mensaje = '';
                        this.genero = '';
                        this.pais = '';
                        alert('Su mensaje fue enviado con éxito');
                    })
                    .catch(err => {
                        console.error('Error en la solicitud:', err);
                        this.error = true;
                    });
            },
            obtenerComentarios() {
                fetch(this.url)
                    .then(response => response.json())
                    .then(data => {
                        this.comentarios = data;
                        this.cargando = false;
                    })
                    .catch(err => {
                        console.error('Error en la solicitud:', err);
                        this.error = true;
                        this.cargando = false;
                    });
            },
        },
        created() {
            this.obtenerComentarios();
        }
    });
});
