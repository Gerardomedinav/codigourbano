// Definir la función initMap globalmente
function initMap() {
    const mapOptions = {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    };
  
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
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
  
  
  document.getElementById('contactForm').addEventListener('submit', function (event) {
    var name = document.querySelector('.name').value;
    var email = document.querySelector('.email').value;
    var message = document.querySelector('.message').value;
    var country = document.querySelector('#country').value; 
    var captcha = document.querySelector('#captcha').value;
    if (name === '' || email === '' || message === '' || country === '' || captcha === '') {
        alert('Por favor complete todos los campos obligatorios.');
        event.preventDefault();
    } else {
        alert(`Envío exitoso. Su mensaje de:\n Nombre: ${name}\n Correo electrónico: ${email}\n Mensaje: ${message}\n País: ${country}\n ¡¡¡Será respondido a la brevedad.!!!!`);
    }
  });
  