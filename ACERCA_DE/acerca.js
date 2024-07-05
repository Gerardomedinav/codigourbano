document.querySelector("header").innerHTML = ` 
<div id="nav">
<div class="logo_flex">
<a class="logo" href="/index.html"><img src="../../CATALOGO/Header_Footer JS/img_head-foot/codigourbano2.png" alt=""></a>
<button  class="boton-hamburguesa" id="abrir"><img src="../../CATALOGO/Header_Footer JS/img_head-foot/icons8-menu-16.png" alt=""></button>
</div>

<div class="topnav" id="topnav">
    
    <ul class="nav-list">


        <button class="cerrar_menu" id="cerrar"><img src="../../CATALOGO/Header_Footer JS/img_head-foot/icons8-close-16.png" alt=""></button>
        <li><a class="menu_interno" href="/index.html">Home</a></li>
        <li><a class="menu_interno" href="../../CATALOGO/zapatillas/zapatilla.html">Zapatillas</a></li>
        <li><a class="menu_interno" href="../../CATALOGO/ropa/ropa.html">Ropa</a></li>
        <li><a class="menu_interno" href="../../CATALOGO/Accesorios/accesorios.html">Accesorios</a></li>
        <li><a class="menu_interno" href="../../ACERCA_DE/acerca_de.html">Nosotros</a></li>
        <li><a class="menu_interno" href="../../CONTACTOS/contactos.html">Contactos</a></li>
        <li><a class="menu_interno" href="../../LOGIN/login.html" title="Acceso Restringido"> <i class="fa-solid fa-user"></i></a></li>


    </ul>
</div>





    <form id="buscador_header_logico">
         <a href="#favorio" class="corazon_compra"><img  class="corazon_compraIMG" src="../../CATALOGO/Header_Footer JS/img_head-foot/icons8-heart-32.png" alt=""></a>
        <a href="#compra"><img src="../../CATALOGO/Header_Footer JS/img_head-foot/icons8-shopping-cart-32.png" alt=""></a>
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
                <ul class="iconos" id="ico_footer">
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



