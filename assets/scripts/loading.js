const loadingWindow = document.querySelector('.loading-screen');

window.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(() => {
        loadingWindow.style.width = '0px';
        loadingWindow.style.height = '0px';
    }, 1000);
    loadingWindow.style.opacity = '0';
});
