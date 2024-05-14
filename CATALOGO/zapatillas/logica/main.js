const modal = document.querySelector('.procutoInterno')
const body = document.body;

function showModal() {
    modal.showModal();
    body.style.overflow = 'hidden'; // Deshabilita el desplazamiento de la página
}

function closeModal() {
    modal.close();
    body.style.overflow = 'auto'; // Habilita el desplazamiento nuevamente
}



