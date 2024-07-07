

document.querySelector("header").innerHTML = ` 
<div id="nav">
<div class="logo_flex">
<a class="logo" href="/index.html"><img src="../Header_Footer JS/img_head-foot/codigourbano2.png" alt=""></a>
<button  class="boton-hamburguesa" id="abrir"><img class="boton-hamburguesaIMG" src="../Header_Footer JS/img_head-foot/icons8-menu-16.png" alt=""></button>
</div>

<div class="topnav" id="topnav">
    
    <ul class="nav-list">


        <button class="cerrar_menu" id="cerrar"><img src="../Header_Footer JS/img_head-foot/icons8-close-16.png" alt=""></button>
        <li><a class="menu_interno" href="/index.html">Home</a></li>
        <li><a class="menu_interno" href="../../CATALOGO/zapatillas/zapatilla.html">Zapatillas</a></li>
        <li><a class="menu_interno" href="../../CATALOGO/ropa/ropa.html">Ropa</a></li>
        <li><a class="menu_interno" href="../../CATALOGO/Accesorios/accesorios.html">Accesorios</a></li>
        <li><a class="menu_interno" href="../../ACERCA_DE/acerca_de.html">Nosotros</a></li>
        <li><a class="menu_interno" href="../../CONTACTOS/contactos.html">Contactos</a></li> 
        <li id="clienteLink" style="display: none;"><a class="menu_interno" href="../../CRUD-Frontend/Cliente.html">Mi Cuenta</a></li>

     <li>
   <li id="userIconContainer"><a class="menu_interno" href="../../LOGIN/login.html" title="Acceso Restringido"> <i class="fa-solid fa-user"></i></a></li>
        <li id="logoutButton" style="display: none;"><a class="menu_interno" id="cerrarSesionBtn" href="#" onclick="cerrarSesion()">Cerrar Sesión</a></li>
    
</li>


    </ul>
</div>





    <form id="buscador_header_logico">
    <a href="#favorio" class="corazon_compra"><img  class="corazon_compraIMG" src="../Header_Footer JS/img_head-foot/icons8-heart-32.png" alt=""></a>
        <a href="#compra" class="carrito_compra"><img class="carrito_compraIMG" src="../Header_Footer JS/img_head-foot/icons8-shopping-cart-32.png" alt=""></a>
    </form>

</div>

`


document.querySelector("footer").innerHTML = `        
<div class="footer-content">
            <div class="footer-principal">
                <h2 class="logo-text">Codigorbano</h2>
                <p>
                    Codigo Urbano es una tienda de ropa en línea que ofrece productos de alta calidad y a la moda. Nos
                    esforzamos por ofrecer a nuestros clientes la mejor experiencia de compra posible.
                </p>
            </div>

            <div class="contact">
                <span><i class="fas fa-phone"></i>   123-456-7890</span>
                <span><i class="fas fa-envelope"></i>   info@codigourbano.com</span>

                <div class="icon">
                <ul class="iconos">
                    <a href="">
                        <i class="fa-brands fa-instagram"></i>
                    </a>
                    <a href="">
                        <i class="fa-brands fa-square-facebook"></i>
                    </a>
                    <a href="">
                        <i class="fa-brands fa-github"></i>
                    </a>
                    <a href="">
                        <i class="fa-brands fa-x-twitter"></i>
                    </a>
                    <a href="">
                        <i class="fa-brands fa-square-whatsapp"></i>
                    </a>
                </ul>
            </div>
</div>

`
document.addEventListener('DOMContentLoaded', function() {
    const isLoged = sessionStorage.getItem('isLoged') === 'true';
    const id_cliente_logeado = sessionStorage.getItem('id_cliente_logeado');
    
    const userIconContainer = document.getElementById('userIconContainer');
    const logoutButton = document.getElementById('logoutButton');
    const clienteLink = document.getElementById('clienteLink');

    if (isLoged) {
        // Usuario logueado: icono en color rosa y enlace a la página de Cliente
        userIconContainer.innerHTML = `<a class="menu_interno" href="../../CRUD-Frontend/Cliente.html" title="Mi Cuenta"> <i class="fa-solid fa-user" style="color: pink;"></i></a>`;
        userIconContainer.setAttribute('title', `Bienvenido Sesión Abierta`);
        logoutButton.style.display = 'inline-block'; // Mostrar botón de cerrar sesión
        if (clienteLink) {
            clienteLink.style.display = 'inline-block'; // Mostrar enlace a Cliente
        }
    } else {
        // Usuario no logueado: icono en negro y enlace a login
        userIconContainer.innerHTML = `<a class="menu_interno" href="../../LOGIN/login.html" title="Acceso Restringido"> <i class="fa-solid fa-user" style="color: black;"></i></a>`;
        userIconContainer.setAttribute('title', `Acceso Restringido`);
        logoutButton.style.display = 'none'; // Ocultar botón de cerrar sesión
        if (clienteLink) {
            clienteLink.style.display = 'none'; // Ocultar enlace a Cliente
        }
    }
});

function cerrarSesion() {
    sessionStorage.removeItem('isLoged');
    sessionStorage.removeItem('id_cliente_logeado');
    // Redirigir a la página de login o a la página principal
    window.location.href = "../../LOGIN/login.html";
}
