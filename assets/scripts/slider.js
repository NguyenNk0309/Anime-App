function slider(callback) {
    fetch(`https://kitsu.io/api/edge/trending/anime`, {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
        },
    })
        .then((res) => res.json())
        .then(callback);
}

slider((result) => {
    const swiper = document.querySelector('.mySwiper .swiper-wrapper');
    let html = '';
    if (swiper) {
        for (let i = 0; i < 10; i++) {
            html += `<div class="swiper-slide">
                <a href="#">
                    <img src="${result.data[i].attributes.posterImage.original}" />
                    <h1>${result.data[i].attributes.canonicalTitle}</h1>    
                </a>
            </div>`;
        }
    }
    swiper.innerHTML = html;
});
