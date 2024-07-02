const app = new Vue({
  el: '#app',
  data() {
    return {
      usuarios: [],
      url: 'https://felixcanosa.pythonanywhere.com/usuarios',
      error: false,
      cargando: true,
      email: '',
      password: '',
      mensajeError: '' // Agregamos una variable para almacenar el mensaje de error
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
      const usuario = this.usuarios.find(usuario => usuario.email === this.email && usuario.contraseña === this.password);
      if (usuario) {
        window.location.href = "../CRUD-Frontend/productos.html";
      } else {
        this.error = true;
        this.mensajeError = 'Error al ingresar email o contraseña. Por favor, ingrese correctamente.'; // Mostramos el mensaje de error
      }
    }
  },
  mounted() {
    this.fetchData(this.url);
  }
});