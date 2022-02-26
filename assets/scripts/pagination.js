import renderAnime from './mainContent.js';

const prevBtn = document.querySelector('.content-main-pagination .icon.prev');
const nextBtn = document.querySelector('.content-main-pagination .icon.next');
var date = new Date();

// offset = (page - 1) * itemsPerPage
let page = 1;
let itemsPerPage = 12;
let offset = 0;

prevBtn.onclick = function () {
    page--;
    if (page < 1) {
        page = 1;
    }
    if (page == 1) {
        prevBtn.classList.add('default');
    }
    offset = (page - 1) * itemsPerPage;
    renderAnime(offset, (result) => {
        const content = document.querySelector('.content-main .row');
        if (content) {
            let html = result.data.map((data) => {
                return `<div class="col l-4 m-6">
                            <a href="#">
                                <div class="item">
                                    <div class="item-img">
                                        <img src="${data.attributes.posterImage.original}" alt="" />
                                    <div class="description">
                                        <h3>Description:</h3>
                                        <p>${data.attributes.description}</p>
                                    </div>
                                    </div>
                                    <h3>${data.attributes.canonicalTitle}</h3>
                                </div>
                            </a>
                        </div>`;
            });
            content.innerHTML = html.join('');
        }
    });
};

nextBtn.onclick = function () {
    page++;
    prevBtn.classList.remove('default');
    offset = (page - 1) * itemsPerPage;
    renderAnime(offset, (result) => {
        const content = document.querySelector('.content-main .row');
        if (content) {
            let html = result.data.map((data) => {
                return `<div class="col l-4 m-6">
                            <a href="#">
                                <div class="item">
                                    <div class="item-img">
                                        <img src="${data.attributes.posterImage.original}" alt="" />
                                    <div class="description">
                                        <h3>Description:</h3>
                                        <p>${data.attributes.description}</p>
                                    </div>
                                    </div>
                                    <h3>${data.attributes.canonicalTitle}</h3>
                                </div>
                            </a>
                        </div>`;
            });
            content.innerHTML = html.join('');
        }
    });
};
