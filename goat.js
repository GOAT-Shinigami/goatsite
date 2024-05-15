function toggleNav() {
    var x = document.getElementById("nav-small");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

// Função para alternar a visibilidade do conteúdo do disclosure
function toggleDisclosure() {
    var x = document.getElementById("disclosure-content");
    if (x.classList.contains("w3-hide")) {
        x.classList.remove("w3-hide");
    } else {
        x.classList.add("w3-hide");
    }
}


// Adicionando console.log para verificar o carregamento do JavaScript
console.log("JavaScript carregado");













