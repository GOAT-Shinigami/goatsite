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

    if (!button) {
        console.error('Connect button not found');
        return;
    }

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

    function isMobile() {
        return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    // Função para conectar à carteira Phantom
    async function connectWallet() {
        if (isMobile() && !isPhantomInstalled()) {
            // Tente redirecionar para a aplicação Phantom se estiver em um dispositivo móvel
            window.location.href = 'https://phantom.app/ul/browse/';
            return;
        }

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
        if (isPhantomInstalled()) {
            await window.solana.disconnect();
            console.log('Disconnected from Phantom Wallet');
        }
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
        console.log('Button clicked');
        if (button.textContent === 'Connect Wallet') {
            await connectWallet();
        } else {
            await disconnectWallet();
        }
    });

    // Adicionando logs para verificar a disponibilidade da Phantom wallet
    console.log('Phantom installed:', isPhantomInstalled());
    console.log('Is Mobile:', isMobile());

    
    const carouselImages = document.querySelector('.carousel-images');
    let index = 0;

    const images = [
        'goat.gif',
        'goat1.gif',
        'marge.gif',
        'dance.gif'
    ];

    images.forEach(src => {
        let element;
        if (src.endsWith('.mp4')) {
            element = document.createElement('video');
            element.src = src;
            element.autoplay = true;
            element.loop = true;
            element.muted = true;
        } else {
            element = document.createElement('img');
            element.src = src;
        }
        carouselImages.appendChild(element);
    });

    function showNextImage() {
        index = (index + 1) % images.length;
        carouselImages.style.transform = `translateX(-${index * 100}%)`;
    }

    setInterval(showNextImage, 3000); // Muda a cada 3 segundos

    const startTime = new Date("May 07, 2024 23:46:00").getTime();
    const endTime = new Date("jun 2, 2024 23:59:00").getTime();
    const timerElement = document.getElementById('timer');
    const presaleLiveElement = document.getElementById('presaleLive');
    const linkElement = document.getElementById('presaleLink');
    const remainingTimeElement = document.getElementById('remainingTime');
    const startsInMessageElement = document.getElementById('startsInMessage');
    const presaleSection = document.getElementById('presale');

    const interval = setInterval(function() {
        const now = new Date().getTime();
        let distance = startTime - now;

        if (distance > 0) {
            // Before presale starts
            timerElement.textContent = formatTime(distance);
            startsInMessageElement.style.display = "block";
        } else {
            // After presale starts
            distance = endTime - now;
            if (distance > 0) {
                startsInMessageElement.style.display = "none";
                presaleLiveElement.style.display = "block";
                linkElement.style.display = "block";
                remainingTimeElement.style.display = "block";
                remainingTimeElement.textContent = "Ends in: " + formatTime(distance);
                timerElement.style.display = "none"; // Ensure the initial timer is hidden
            } else {
                clearInterval(interval);
                presaleLiveElement.textContent = "The presale is now offline.";
                linkElement.style.display = "none";
                remainingTimeElement.style.display = "none";
                presaleSection.style.display = "none"; // Oculta a seção de pré-venda
            }
        }
    }, 1000);

    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    if (isMobile()) {
        document.body.classList.add("mobile");
    } else {
        document.body.classList.add("desktop");
    }

    // Adicionando console.log para verificar o carregamento do JavaScript
    console.log("JavaScript carregado");
});

function formatTime(distance) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        return days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    }














