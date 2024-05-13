function adjustBackgroundImage() {
        const header = document.querySelector('.header-bg');
        const screenWidth = window.innerWidth;

        // Define diferentes alturas mínimas e ajustes de fundo com base no tamanho da tela
        if (screenWidth > 1600) {
            header.style.minHeight = '768px'; // Altura para telas muito grandes
            header.style.backgroundSize = 'cover';
        } else if (screenWidth > 1200) {
            header.style.minHeight = '600px'; // Altura para telas grandes
            header.style.backgroundSize = 'cover';
        } else if (screenWidth > 992) {
            header.style.minHeight = '500px'; // Altura para laptops pequenos
            header.style.backgroundSize = 'cover';
        } else if (screenWidth > 768) {
            header.style.minHeight = '450px'; // Altura para tablets
            header.style.backgroundSize = 'contain';
        } else {
            header.style.minHeight = '300px'; // Altura para smartphones
            header.style.backgroundSize = 'contain';
        }

        // Centraliza a imagem em todos os casos
        header.style.backgroundPosition = 'center center';
    }

    // Aplica a função no carregamento e no redimensionamento da página
    window.addEventListener('load', adjustBackgroundImage);
    window.addEventListener('resize', adjustBackgroundImage);
