console.log(location.search)     // lee los argumentos pasados a este formulario
var id=location.search.substr(4)  // producto_update.html?id=1
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        id:0,
        nombre:"",
        contrasena:"",
        email:"",
        tipoUsuario:"",
        url:'https://felixcanosa.pythonanywhere.com/usuarios/'+id,
       }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id=data.id
                    this.nombre = data.nombre;
                    this.contrasena=data.contrasena
                    this.email=data.email
                    this.tipoUsuario=data.tipo_usuario          
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        modificar() {
            let usuario = {}
            if (this.nombre) usuario.nombre = this.nombre
            if (this.contrasena) usuario.contrasena = this.contraseña
            if (this.email) usuario.email = this.email
            if (this.tipoUsuario !== undefined) usuario.tipo_usuario = this.tipoUsuario
        
            var options = {
                body: JSON.stringify(usuario),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(err => { throw err; });
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Respuesta del servidor:", data);
                    alert("Registro modificado")
                    window.location.href = "./usuarios.html";
                })
                .catch(err => {
                    console.error("Error detallado:", err);
                    alert("Error al Modificar: " + (err.error || err.message || "Error desconocido"))
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
