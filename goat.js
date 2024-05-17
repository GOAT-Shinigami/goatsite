// Função para alternar a navegação em telas pequenas
function toggleNav() {
    var x = document.getElementById("nav-small");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

// Função para obter o saldo da carteira
async function getWalletBalance(address) {
    try {
        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed');
        const balance = await connection.getBalance(new solanaWeb3.PublicKey(address));
        return balance / solanaWeb3.LAMPORTS_PER_SOL; // Converte de lamports para SOL
    } catch (error) {
        console.error('Failed to get balance:', error);
        return 0;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('connectBtn');
    const statusElement = document.getElementById('status');
    const addressElement = document.getElementById('walletAddress');
    const balanceElement = document.getElementById('walletBalance');
    const walletInfo = document.getElementById('wallet-info');

    // Inicializa a interface com base nos dados do localStorage
    updateUIFromStorage();

    function updateUIFromStorage() {
        const connected = localStorage.getItem('isConnected') === 'true';
        const address = localStorage.getItem('walletAddress');
        if (connected && address) {
            getWalletBalance(address).then(balance => {
                updateUI(connected, address, balance);
            });
        } else {
            updateUI(false);
        }
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
            const balance = await getWalletBalance(response.publicKey.toString());
            button.textContent = 'Disconnect from Phantom';
            localStorage.setItem('isConnected', 'true');
            localStorage.setItem('walletAddress', response.publicKey.toString());
            updateUI(true, response.publicKey.toString(), balance);
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
    function updateUI(isConnected, address = null, balance = 0) {
        if (isConnected) {
            statusElement.textContent = 'Status: Connected';
            addressElement.textContent = 'Address: ' + address;
            balanceElement.textContent = 'Balance: ' + balance + ' SOL';
            walletInfo.style.display = 'block'; // Mostra as informações da carteira quando conectado
        } else {
            statusElement.textContent = 'Status: Not Connected';
            addressElement.textContent = 'Address: ';
            balanceElement.textContent = 'Balance: ';
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

    // Adicionando console.log para verificar o carregamento do JavaScript
    console.log("JavaScript carregado");
});
















