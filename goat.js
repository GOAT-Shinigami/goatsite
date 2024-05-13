function adjustHeaderBackground() {
    const header = document.querySelector('.header-bg');
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;

    if (screenWidth > 1200) { // Considerado tela grande (desktop)
        header.style.minHeight = '600px';
    } else if (screenWidth > 992 && screenWidth <= 1200) { // Considerado médio (laptops menores)
        header.style.minHeight = '500px';
    } else if (screenWidth > 768 && screenWidth <= 992) { // Considerado pequeno (tablets)
        header.style.minHeight = '450px';
    } else { // Considerado muito pequeno (smartphones)
        header.style.minHeight = '300px';
    }
}

// Ajusta o tamanho no carregamento da página
adjustHeaderBackground();

// Ajusta o tamanho quando a janela é redimensionada
window.addEventListener('resize', adjustHeaderBackground);