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