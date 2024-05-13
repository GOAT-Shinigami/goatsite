function adjustBackgroundImage() {
    const headerBg = document.querySelector('.header-bg');
    const aspectRatio = window.innerWidth / window.innerHeight;

    // Define a estratégia de tamanho de fundo com base na relação de aspecto
    if (aspectRatio > 1) {
        // Telas mais largas que altas (desktops)
        headerBg.style.backgroundSize = (aspectRatio > 1.77) ? 'contain' : 'cover';
    } else {
        // Telas mais altas que largas (smartphones)
        headerBg.style.backgroundSize = 'contain'; // Evitar cortar partes importantes em dispositivos verticais
    }

    // Aplica uma altura mínima com base na largura da tela
    if (window.innerWidth > 1500) {
        headerBg.style.minHeight = '768px'; // Grandes desktops
    } else if (window.innerWidth > 1200) {
        headerBg.style.minHeight = '600px'; // Desktops médios
    } else if (window.innerWidth > 992) {
        headerBg.style.minHeight = '500px'; // Tablets grandes e laptops pequenos
    } else if (window.innerWidth > 768) {
        headerBg.style.minHeight = '450px'; // Tablets
    } else {
        headerBg.style.minHeight = '300px'; // Smartphones
    }
}

// Adicionar listeners para carregamento e redimensionamento de janela
window.addEventListener('load', adjustBackgroundImage);
window.addEventListener('resize', adjustBackgroundImage);
