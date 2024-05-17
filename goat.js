document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('connectBtn');
    const modal = document.getElementById('walletModal');
    // Inicializa a interface com base nos dados do localStorage
    updateUIFromStorage();

    function updateUIFromStorage() {
        const connected = localStorage.getItem('isConnected') === 'true';
        const address = localStorage.getItem('walletAddress');
        updateUI(connected, address);
        button.textContent = connected ? 'Disconnect from Phantom': 'Connect Wallet';
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
            modal.style.display = 'block'; // Exibe o modal
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
        const statusElement = document.getElementById('status');
        const addressElement = document.getElementById('walletAddress');    
        const infoDisplay = document.getElementById('infoDisplay');

        if (isConnected) {
            statusElement.textContent = 'Status: Connected';
            addressElement.textContent = 'Address: ' + address;
            infoDisplay.style.display = 'block'; // Mostra o infoDisplay quando conectado
            modal.style.display = 'block'; // Exibe o modal quando conectado
        } else {
            statusElement.textContent = 'Status: Not Connected';
            addressElement.textContent = 'Address: ';
            infoDisplay.style.display = 'none'; // Oculta quando não conectado
            modal.style.display = 'none'; // Oculta o modal quando desconectado
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




// Função para alternar a navegação em telas pequenas
function toggleNav() {
    var x = document.getElementById("nav-small");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

// Adicionando console.log para verificar o carregamento do JavaScript
console.log("JavaScript carregado");

// Adiciona um evento de rolagem suave ao carregar a página
window.onload = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};














