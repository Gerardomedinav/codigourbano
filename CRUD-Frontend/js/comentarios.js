const { createApp } = Vue
createApp({
    data() {
        return {
            comentarios: [],
            url: 'https://felixcanosa.pythonanywhere.com/comentarios',
            error: false,
            cargando: true,
            id: 0,
            nombre: "",
            email:"",
            mensaje:"",
            pais:"",
            genero:"",
            campoBusqueda: '',
            valorBusqueda: '',
           
        }
    },
    methods: {
        fetchData(url) {
            this.cargando = true;
            this.error = false;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.comentarios = data;
                    this.cargando = false;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true;
                    this.cargando = false;
                })
        },
        eliminar(id) {
            const url = this.url + '/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => {
                    if (!res.ok) throw new Error('Failed to delete');
                    return res.json();
                })
                .then(data => {
                    alert('Registro Eliminado');
                    // Remove the deleted comment from the local array
                    this.comentarios = this.comentarios.filter(c => c.id !== id);
                })
                .catch(err => {
                    console.error(err);
                    alert('Error al eliminar el registro');
                });
        },
       

        buscar(){
            let url = this.url;
            if (this.campoBusqueda && this.valorBusqueda) {
                url += `?${this.campoBusqueda}=${this.valorBusqueda}`;
            }
            this.fetchData(url);
        },
        
    },
    created() {
        this.fetchData(this.url);
    },
    
}).mount('#app')