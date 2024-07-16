document.addEventListener('DOMContentLoaded', function() {
    const topnav = document.querySelector("#topnav");
    const overlay = document.querySelector("#overlay");
    const abrir = document.querySelector("#abrir");
    const cerrar = document.querySelector("#cerrar");

    function openMenu() {
        topnav.classList.add("visible");
        overlay.classList.add("visible");
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        topnav.classList.remove("visible");
        overlay.classList.remove("visible");
        document.body.style.overflow = '';
    }

    abrir.addEventListener("click", openMenu);
    cerrar.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);
});