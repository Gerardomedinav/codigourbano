const app = new Vue({
  el: '#app',
  data() {
    return {
      usuarios: {},
      url: 'https://felixcanosa.pythonanywhere.com/usuarios',
      error: false,
      cargando: true,
      email: '',
      password: '',
      mensajeError: ''
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
    login() {
      this.fetchData(this.url);
      let usuario = null;
      for (const key in this.usuarios) {
        if (this.usuarios[key].email === this.email && this.usuarios[key].contrasena === this.password) {
          usuario = this.usuarios[key];
          break;
        }
      }
      if (usuario) {
        if (usuario.tipo_usuario === 1) { // Redireccionar si es administrador
          window.location.href = "../CRUD-Frontend/productos.html";
        } else { // Cliente logueado
          sessionStorage.setItem('isLoged', 'true');
          sessionStorage.setItem('id_cliente_logeado', usuario.id);
          alert(`Usuario ${usuario.nombre} inició sesión con éxito.`);
          window.location.href = "../CATALOGO/ropa/ropa.html"; // Reemplaza con la URL para clientes logueados
        }
      } else {
        this.error = true;
        this.mensajeError = 'Error al ingresar email o contraseña. Por favor, ingrese correctamente.';
      }
    }
  },
  mounted() {
    this.fetchData(this.url);
  }
});
