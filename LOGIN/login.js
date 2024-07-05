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
      if (usuario && usuario.tipo_usuario === 1) { // Aquí se corrige la referencia a la propiedad 'tipo'
        window.location.href = "../CRUD-Frontend/productos.html";
      } else {  //necesito un if else{}
        this.error = true;
        this.mensajeError = 'Error al ingresar email o contraseña. Por favor, ingrese correctamente.';
      }
    }
  },
  mounted() {
    this.fetchData(this.url);
  }
});
