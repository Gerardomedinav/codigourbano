console.log(location.search)
var id = location.search.substr(4)
console.log(id)

const { createApp } = Vue

createApp({
  data() {
    return {
      id: 0,
      nombre: "",
      imagen: "",
      marca: "",
      stock: 0,
      precio: 0,
      tipoProducto: "",
      descripcion: "",
      origen: "",
      url: 'https://felixcanosa.pythonanywhere.com/productos/' + id,
    }
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.id = data.id
          this.nombre = data.nombre
          this.imagen = data.imagen
          this.stock = data.stock
          this.tipoProducto = data.tipoProducto
          this.precio = data.precio
          this.descripcion = data.descripcion
          this.marca = data.marca
          this.origen = data.origen
        })
        .catch(err => {
          console.error(err)
          this.error = true
        })
    },
    modificar() {
      // Verificar si todos los campos requeridos están llenos
      if (!this.nombre || !this.precio || !this.stock || !this.tipoProducto || !this.imagen || !this.marca || !this.origen || !this.descripcion) {
        alert("Por favor, complete todos los campos obligatorios.");
        return;
      }
    
      // Verificar que precio y stock sean números positivos
      if (this.precio <= 0 || this.stock < 0) {
        alert("El precio debe ser mayor que 0 y el stock no puede ser negativo.");
        return;
      }
    
      let producto = {
        nombre: this.nombre,
        precio: this.precio,
        stock: this.stock,
        tipoProducto: this.tipoProducto,
        imagen: this.imagen,
        descripcion: this.descripcion,
        marca: this.marca,
        origen: this.origen
      }
      var options = {
        body: JSON.stringify(producto),
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
      }
      fetch(this.url, options)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          alert("Registro modificado")
          window.location.href = "./productos.html"
        })
        .catch(err => {
          console.error('Error:', err)
          alert("Error al Modificar: " + err.message)
        })
    }
  },
  created() {
    this.fetchData(this.url)
  },
}).mount('#app')