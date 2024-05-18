// Função para alternar a navegação em telas pequenas
function toggleNav() {
    var x = document.getElementById("nav-small");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('connectBtn');
    const statusElement = document.getElementById('status');
    const addressElement = document.getElementById('walletAddress');
    const walletInfo = document.getElementById('wallet-info');

    // Inicializa a interface com base nos dados do localStorage
    updateUIFromStorage();

    function updateUIFromStorage() {
        const connected = localStorage.getItem('isConnected') === 'true';
        const address = localStorage.getItem('walletAddress');
        updateUI(connected, address);
        button.textContent = connected ? 'Disconnect from Phantom' : 'Connect Wallet';
    }

    function isPhantomInstalled() {
        return window.solana && window.solana.isPhantom;
    }

    // Função para conectar à carteira Phantom
    async function connectWallet() {
        if (!isPhantomInstalled()) {
            console.error('Phantom wallet is not installed.');
            alert('Please install Phantom wallet.');
            return;
        }

        try {
            const response = await window.solana.connect({ onlyIfTrusted: false });
            console.log('Connected to Phantom Wallet:', response.publicKey.toString());
            button.textContent = 'Disconnect from Phantom';
            localStorage.setItem('isConnected', 'true');
            localStorage.setItem('walletAddress', response.publicKey.toString());
            updateUI(true, response.publicKey.toString());
        } catch (error) {
            if (error.message.includes("User rejected the request")) {
                alert("Connection request was rejected. Please allow the connection in your Phantom wallet.");
            } else {
                console.error('Failed to connect:', error);
            }
        }
    }

    // Função para desconectar da carteira Phantom
    async function disconnectWallet() {
        await window.solana.disconnect();
        console.log('Disconnected from Phantom Wallet');
        button.textContent = 'Connect Wallet';
        localStorage.removeItem('isConnected');
        localStorage.removeItem('walletAddress');
        updateUI(false);
    }

    // Atualiza o status da carteira e o endereço na página
    function updateUI(isConnected, address = null) {
        if (isConnected) {
            statusElement.textContent = 'Status: Connected';
            addressElement.textContent = 'Address: ' + address;
            walletInfo.style.display = 'block'; // Mostra as informações da carteira quando conectado
        } else {
            statusElement.textContent = 'Status: Not Connected';
            addressElement.textContent = 'Address: ';
            walletInfo.style.display = 'none'; // Oculta as informações da carteira quando não conectado
        }
    }

    // Listener para o botão
    button.addEventListener('click', async () => {
        if (button.textContent === 'Connect Wallet') {
            await connectWallet();
        } else {
            await disconnectWallet();
        }
    });

    const carouselImages = document.querySelector('.carousel-images');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');

    const media = [
        'dance.gif',
        'goat.gif',
        'goat1.gif',
        'marge.gif',
    
        // Adicione os caminhos das imagens, GIFs e vídeos adicionais aqui
    ];

    let currentIndex = 0;
    let autoSlideInterval;

    function updateCarousel() {
        carouselImages.style.transform = `translateX(${-currentIndex * 100}%)`;
        resetAutoSlide();
    }

    function showNextMedia() {
        currentIndex = (currentIndex + 1) % media.length;
        updateCarousel();
    }

    function showPrevMedia() {
        currentIndex = (currentIndex - 1 + media.length) % media.length;
        updateCarousel();
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);

        const currentMediaElement = carouselImages.children[currentIndex];
        if (currentMediaElement.tagName === 'VIDEO') {
            currentMediaElement.play();
            currentMediaElement.onended = function () {
                autoSlideInterval = setInterval(showNextMedia, 5000);
            };
        } else {
            autoSlideInterval = setInterval(showNextMedia, 5000);
        }
    }

    // Insere as imagens, GIFs e vídeos no carrossel
    media.forEach((item) => {
        let mediaElement;
        if (item.endsWith('.mp4')) {
            mediaElement = document.createElement('video');
            mediaElement.src = item;
            mediaElement.controls = false;
        } else {
            mediaElement = document.createElement('img');
            mediaElement.src = item;
        }
        carouselImages.appendChild(mediaElement);
    });

    nextButton.addEventListener('click', showNextMedia);
    prevButton.addEventListener('click', showPrevMedia);

    updateCarousel();
    resetAutoSlide();

    // Adicionando console.log para verificar o carregamento do JavaScript
    console.log("JavaScript carregado");
});
















