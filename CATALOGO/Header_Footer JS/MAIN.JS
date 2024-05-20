document.querySelector("header").innerHTML = ` 
<div id="nav">
<div class="logo_flex">
<a class="logo" href="/index.html"><img src="../Header_Footer JS/img_head-foot/codigourbano2.png" alt=""></a>
<button  class="boton-hamburguesa" id="abrir"><img src="../Header_Footer JS/img_head-foot/icons8-menu-16.png" alt=""></button>
</div>

<div class="topnav" id="topnav">
    
    <ul class="nav-list">
    <button class="cerrar_menu" id="cerrar"><img src="../Header_Footer JS/img_head-foot/icons8-close-16.png" alt=""></button>
    <li class="listas"><a class="menu_interno" href="/index.html">Home</a></li>
    <li class="listas"><a class="menu_interno" href="../zapatillas/zapatilla.html">Zapatillas</a></li>
    <li class="listas"><a class="menu_interno" href="../ropa/ropa.html">Ropa</a></li>
    <li class="listas"><a class="menu_interno" href="../Accesorios/accesorios.html">Accesorios</a></li>
    <li class="listas"><a class="menu_interno" href="">Nosotros</a></li>
    <li class="listas"><a class="menu_interno" href="">Contactos</a></li>
    </ul>
</div>





    <form id="buscador_header_logico">
        <a href="#favorio" class="corazon_compra"><img  src="" alt="">&hearts;</a>
        <a href="#compra"><img src="../Header_Footer JS/img_head-foot/icons8-shopping-cart-32.png" alt=""></a>
    </form>

</div>

`


document.querySelector("footer").innerHTML = `        
<div class="footer-content">
<div class="footer-section about">
    <h2 class="logo-text"><span>Codigo</span>Urbano</h2>
    <p>
        Codigo Urbano es una tienda de ropa en línea que ofrece productos de alta calidad y a la moda. Nos esforzamos por ofrecer a nuestros clientes la mejor experiencia de compra posible.
    </p>
    <div class="contact">
        <span><i class="fas fa-phone"></i>   123-456-7890</span>
        <span><i class="fas fa-envelope"></i>   info@codigourbano.com</span>
    </div>

`