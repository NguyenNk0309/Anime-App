const scrollTopBtn = document.querySelector('.footer-body .stt-btn');

scrollTopBtn.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
