document.querySelector("header").innerHTML=` 
<div class="logo_flex">
<a class="logo" href="/index.html"><img src="../img/codigourbano2.png" alt=""></a>
<button  class="boton-hamburguesa" id="abrir"><img src="../CATALOGO/Header_Footer JS/img_head-foot/icons8-menu-16.png" alt=""></button>
</div>

<div class="topnav" id="topnav">
    
    <ul class="nav-list">
        <button class="cerrar_menu" id="cerrar"><img src="../CATALOGO/Header_Footer JS/img_head-foot/icons8-menu-16.png" alt=""></button>
        <li><a class="menu_interno" href="/index.html">Home</a></li>
        <li><a class="menu_interno" href="../CATALOGO/zapatillas/zapatilla.html">Zapatillas</a></li>
        <li><a class="menu_interno" href="../CATALOGO/ropa/ropa.html">Ropa</a></li>
        <li><a class="menu_interno" href="../CATALOGO/Accesorios/accesorios.html">Accesorios</a></li>
        <li><a class="menu_interno" href="acerca_de.html">Acerca de</a></li>
        <li><a class="menu_interno" href="../../CONTACTOS/contactos.html">Contactos</a></li>
    </ul>
</div>

    <form id="buscador_header_logico">
        
        <input placeholder="Search" id="buscador_header" type="text">
        <a href=""><img class="corazon_compra" src="../CATALOGO/Header_Footer JS/img_head-foot/icons8-shopping-cart-32.png" alt=""></a>
        <a href=""><img class="corazon_compra" src="../CATALOGO/Header_Footer JS/img_head-foot/icons8-heart-32.png" alt=""></a>
    </form>

`


document.querySelector("footer").innerHTML=`        
<div class="footer-content">
<div class="footer-section about">
    <h1 class="logo-text"><span>Codigo</span>Urbano</h1>
    <p>
        Codigo Urbano es una tienda de ropa en línea que ofrece productos de alta calidad y a la moda. Nos esforzamos por ofrecer a nuestros clientes la mejor experiencia de compra posible.
    </p>
    <div class="contact">
        <span><i class="fas fa-phone"></i>   123-456-7890</span>
        <span><i class="fas fa-envelope"></i>   info@codigourbano.com</span>
    </div>
</div>

<div class="footer-section links">
    <h2>Enlaces rápidos</h2>
    <br>
    <ul>
        <a href="#"><li>Eventos</li></a>
        <a href="#"><li>Equipo</li></a>
        <a href="#"><li>Galerías</li></a>
        <a href="#"><li>Términos y Condiciones</li></a>
    </ul>
</div>

<div class="footer-bottom">
  © codigourbano.com | Diseñado por Codigo Urbano
</div>`


