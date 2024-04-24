const closeButton = document.querySelector('.cerrar_menu');
const navList = document.querySelector('.nav-list');

hamburgerButton.addEventListener('click', () => {
    navList.classList.toggle('show');
});

closeButton.addEventListener('click', () => {
    navList.classList.remove('show');
});