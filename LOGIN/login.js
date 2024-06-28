const loginBtn = document.getElementById('loginBtn');
const emailInput = document.querySelector('.input-field input[type="text"]');
const passwordInput = document.querySelector('.input-field input[type="password"]');

loginBtn.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Si las credenciales son válidas, redirigir al usuario al dashboard.html
      window.location.href = 'dashboard.html';
    } else {
      // Mostrar un mensaje de error al usuario
      alert('Credenciales inválidas. Inténtalo de nuevo.');
    }
  })
  .catch(error => {
    console.error('Error al iniciar sesión:', error);
    alert('Ocurrió un error. Inténtalo de nuevo más tarde.');
  });
});
