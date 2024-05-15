function adjustBackgroundAndNavbar() {
    const bg = document.querySelector('.header-bg');
    const ratio = window.innerWidth / window.innerHeight;

    // Ajustar tamanho de fundo com base na relação de aspecto
    bg.style.backgroundSize = (ratio > 1) ? 'cover' : 'contain';

    // Ajustar altura mínima com base na largura da tela
    if (window.innerWidth > 1200) {
        bg.style.minHeight = '768px';
        navbar.style.padding = '0 50px'; // Espaçamento maior para telas grandes
    } else if (window.innerWidth > 992) {
        bg.style.minHeight = '500px';
        navbar.style.padding = '0 20px'; // Espaçamento padrão para desktops menores
    } else if (window.innerWidth > 768) {
        bg.style.minHeight = '450px';
        navbar.style.padding = '0 15px'; // Espaçamento reduzido para tablets
    } else {
        bg.style.minHeight = '300px';
        navbar.style.padding = '0 10px'; // Espaçamento mínimo para smartphones
    }

// Ajustes dinâmicos para links na navbar
    const links = navbar.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.style.fontSize = (window.innerWidth > 1200) ? '1.2rem' : '1rem';
        link.style.marginRight = (window.innerWidth > 1200) ? '20px' : '10px';
    });
    
}

window.addEventListener('load', adjustBackgroundAndNavbar);
window.addEventListener('resize', adjustBackgroundAndNavbar);


