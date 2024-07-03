// mensajes.js
import { createApp } from 'vue';

const app = createApp({
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
    guardarComentario() {
      const comentario = {
        nombre: this.nombre,
        email: this.email,
        mensaje: this.mensaje,
        genero: this.genero,
        pais: this.pais,
      }
      var options = {
        body: JSON.stringify(comentario),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
      }
      fetch(this.url, options)
        .then(response => response.json())
        .then(data => {
          this.comentarios.push(data)
          this.nombre = ''
          this.email = ''
          this.mensaje = ''
          this.genero = ''
          this.pais = ''
        })
        .catch(err => {
          console.error(err)
          this.error = true
        })
    },
    eliminarComentario(id) {
      const url = this.url + '/' + id
      var options = {
        method: 'DELETE',
      }
      fetch(url, options)
        .then(res => res.text())
        .then(res => {
          this.comentarios = this.comentarios.filter(comentario => comentario.id !== id)
        })
        .catch(err => {
          console.error(err)
          this.error = true
        })
    },
    obtenerComentarios() {
      fetch(this.url)
        .then(response => response.json())
        .then(data => {
          this.comentarios = data
          this.cargando = false
        })
        .catch(err => {
          console.error(err)
          this.error = true
          this.cargando = false
        })
    },
  },
  created() {
    this.obtenerComentarios()
  },
});

app.mount('#comentarios');
