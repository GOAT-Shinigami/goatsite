function adjustBackground() {
    const bg = document.querySelector('.header-bg');
    const ratio = window.innerWidth / window.innerHeight;

    bg.style.backgroundSize = (ratio > 1) ? 'cover' : 'contain';

    if (window.innerWidth > 1200) {
        bg.style.minHeight = '768px';
    } else if (window.innerWidth > 992) {
        bg.style.minHeight = '500px';
    } else if (window.innerWidth > 768) {
        bg.style.minHeight = '450px';
    } else {
        bg.style.minHeight = '300px';
    }
}

window.addEventListener('load', adjustBackground);
window.addEventListener('resize', adjustBackground);

