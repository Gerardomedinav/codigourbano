const topnav = document.querySelector("#topnav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    topnav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    topnav.classList.remove("visible");
})


  
