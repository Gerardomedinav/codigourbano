// Definir la función initMap globalmente
function initMap() {
    const mapOptions = {
        center: { lat: -26.183296938050677, lng: -58.16506262489656 },
        zoom: 12,
    };

    const mapElement = document.getElementById("map");
    if (mapElement) {
        map = new google.maps.Map(mapElement, mapOptions);

        // Crear el marcador con el icono personalizado
        const marker = new google.maps.Marker({
            position: { lat: -26.183296938050677, lng: -58.16506262489656 },
            map: map,
            icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                scaledSize: new google.maps.Size(40, 40),
            },
        });
    } else {
        console.error("Elemento del mapa no encontrado");
    }
}

// Callback para cargar la API de Google Maps
function loadGoogleMaps() {
    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyADQ_a0eH87DL2KhYW9BgZTma-LkNEMIXo&callback=initMap&loading=async";
    script.defer = true;
    document.head.appendChild(script);
}

// Función helper para obtener elementos del DOM
function getElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.error(`Elemento no encontrado: ${selector}`);
        return null;
    }
    return element;
}

// Manejar el envío del formulario
function handleFormSubmit(event) {
    event.preventDefault();

    const name = getElement(".name");
    const email = getElement(".email");
    const message = getElement(".message");
    const country = getElement("#country");
    const captcha = getElement("#captcha");

    let isValid = true;

    // Función helper para validar campo
    function validateField(field, errorClass, errorMessage) {
        if (!field) return false;
        if (field.value === "") {
            field.style.border = "1px solid red";
            const errorElement = getElement(errorClass);
            if (errorElement) errorElement.textContent = errorMessage;
            return false;
        } else {
            field.style.border = "1px solid #ccc";
            const errorElement = getElement(errorClass);
            if (errorElement) errorElement.textContent = "";
            return true;
        }
    }

    isValid = validateField(name, ".name-error", "Por favor, ingrese su nombre.") && isValid;
    isValid = validateField(email, ".email-error", "Por favor, ingrese su correo electrónico.") && isValid;
    isValid = validateField(message, ".message-error", "Por favor, ingrese su mensaje.") && isValid;
    isValid = validateField(country, ".country-error", "Por favor, seleccione un país.") && isValid;
    isValid = validateField(captcha, ".captcha-error", "Por favor, ingrese el código captcha.") && isValid;

    if (isValid) {
        alert(`Envío exitoso. Su mensaje de:\n Nombre: ${name.value}\n Correo electrónico: ${email.value}\n Mensaje: ${message.value}\n País: ${country.value}\n ¡¡¡Será respondido a la brevedad.!!!!`);
    }
}

// Cargar la API de Google Maps y configurar el formulario cuando se cargue el contenido de la página
document.addEventListener("DOMContentLoaded", function() {
    loadGoogleMaps();

    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", handleFormSubmit);
        
        // Agregar evento táctil para dispositivos móviles
        form.addEventListener("touchstart", function() {
            console.log("Formulario tocado");
        });
    } else {
        console.error("El formulario no se encontró en el DOM");
    }

    console.log("Formulario encontrado:", form);
});

/* Previsualización de la imagen */
document.addEventListener("DOMContentLoaded", function() {
    const inputImage = document.getElementById('profile-image');
    const previewImage = document.getElementById('previewImage');

    if (inputImage && previewImage) {
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
                previewImage.style.display = 'none';
            }
        });
    } else {
        console.error("Elementos de previsualización de imagen no encontrados");
    }
});