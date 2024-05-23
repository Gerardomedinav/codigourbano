document.getElementById('contactForm').addEventListener('submit', function (event) {
    var name = document.querySelector('.name').value;
    var email = document.querySelector('.email').value;
    var message = document.querySelector('.message').value;
    var country = document.querySelector('#country').value; 
    var captcha = document.querySelector('#captcha').value;
    if (name === '' || email === '' || message === '' || country === '' || captcha === '') {
        alert('Por favor complete todos los campos obligatorios.'); event.preventDefault();
    } else {
        alert(`Envío exitoso. Su mensaje de:\n Nombre: ${name}\n Correo electrónico: ${email}\n Mensaje: ${message}\n País: ${country}\n  ¡¡¡Será respondido a la brevedad.!!!!`);
    }
}); 

// Obtener el input de tipo file y el div de previsualizacion
const profileInput = document.getElementById('profile-image');
const previewImage = document.querySelector('.preview-image');

// Agregar el evento 'change' al input de tipo file
profileInput.addEventListener('change', (event) => {
  // Obtener el archivo seleccionado
  const file = event.target.files[0];

  // Verificar si se ha seleccionado un archivo
  if (file) {
    // Crear un objeto URL para la imagen
    const imageUrl = URL.createObjectURL(file);

    // Crear un elemento <img> y establecer la URL de la imagen
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Imagen de perfil';
    img.style.maxWidth = '100%';
    img.style.maxHeight = '200px';

    // Limpiar el contenido anterior del div de previsualizacion
    previewImage.innerHTML = '';

    // Agregar la imagen al div de previsualizacion
    previewImage.appendChild(img);
  }
});
