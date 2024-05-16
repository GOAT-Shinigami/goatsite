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














