// Definir la función initMap globalmente
function initMap() {
    const mapOptions = {
        center: { lat: -26.183296938050677, lng: -58.16506262489656 },
        zoom: 12,
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Crear el marcador con el icono personalizado
    const marker = new google.maps.Marker({
        position: { lat: -26.183296938050677, lng: -58.16506262489656 },
        map: map,
        icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', // URL del icono rojo
            scaledSize: new google.maps.Size(40, 40), // Tamaño del icono
        },
    });
}
  
  // Callback para cargar la API de Google Maps
  function loadGoogleMaps() {
    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyADQ_a0eH87DL2KhYW9BgZTma-LkNEMIXo&callback=initMap&loading=async";
    script.defer = true;
    document.head.appendChild(script);
  }
  
  // Cargar la API de Google Maps cuando se cargue el contenido de la página
  document.addEventListener("DOMContentLoaded", loadGoogleMaps);
  
  // Manejar el envío del formulario
  document.getElementById("contactForm").addEventListener("submit", function(event) {
    var name = document.querySelector(".name").value;
    var email = document.querySelector(".email").value;
    var message = document.querySelector(".message").value;
    var country = document.querySelector("#country").value;
    var captcha = document.querySelector("#captcha").value;
    if (name === "" || email === "" || message === "" || country === "" || captcha === "") {
      alert("Por favor complete todos los campos obligatorios.");
      event.preventDefault();
    } else {
      alert(`Envío exitoso. Su mensaje de:\n Nombre: ${name}\n Correo electrónico: ${email}\n Mensaje: ${message}\n País: ${country}\n ¡¡¡Será respondido a la brevedad.!!!!`);
    }
  });
  
  
/* Previsualización de la imagen */
const inputImage = document.getElementById('profile-image');
const previewImage = document.getElementById('previewImage');

inputImage.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            previewImage.src = event.target.result;
            previewImage.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        previewImage.src = '#';
        previewImage.style.display = 'none'; // Ocultar la imagen previsualizada si no se selecciona ningún archivo
    }
});
 