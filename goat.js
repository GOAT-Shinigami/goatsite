function adjustStylesBasedOnScreen() {
    const headerBg = document.querySelector('.header-bg');
    const screenWidth = window.innerWidth;

    // Ajustar a altura do cabeçalho com base no tamanho da tela
    if (screenWidth > 1500) { // Muito grande
        headerBg.style.minHeight = '768px';
        headerBg.style.backgroundAttachment = 'fixed';
    } else if (screenWidth > 1200) { // Grande
        headerBg.style.minHeight = '600px';
        headerBg.style.backgroundAttachment = 'scroll';
    } else if (screenWidth > 992) { // Médio
        headerBg.style.minHeight = '500px';
        headerBg.style.backgroundAttachment = 'scroll';
    } else { // Pequeno e muito pequeno
        headerBg.style.minHeight = '300px'; // Usar o valor padrão de CSS
    }

    // Verificações específicas para navegadores, se necessário
    var ua = navigator.userAgent;
    if (/MSIE \d|Trident.*rv:/.test(ua)) {
        // Código específico para Internet Explorer
        headerBg.style.backgroundSize = 'contain';
    }
}

// Adiciona event listeners para carregamento e redimensionamento
window.addEventListener('load', adjustStylesBasedOnScreen);
window.addEventListener('resize', adjustStylesBasedOnScreen);
