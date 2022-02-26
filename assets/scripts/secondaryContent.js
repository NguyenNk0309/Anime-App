const categoryInput = document.querySelector('.content-secondary .content-secondary-header input');
const categorySearch = document.querySelector('.content-secondary .content-secondary-header button');
const list = document.querySelector('.content-secondary .content-secondary-list');
let html;
let page1 = 1;
let currentValue1 = '';

categorySearch.onclick = function () {
    const inputValue = categoryInput.value.trim();
    list.scrollHeight = 0;
    if (inputValue != '') {
        currentValue1 = inputValue;
        page1 = 1;
        renderAnime(0, inputValue, (result) => {
            console.log(result);
            html = result.data.map((item) => {
                return `<div class="col l-12">
                        <a href="#">
                            <div class="item">
                                <img src="${item.attributes.posterImage.original}" alt="" />
                                <div class="description">
                                    <h2>${item.attributes.canonicalTitle}</h2>
                                </div>
                            </div>
                        </a>
                    </div>`;
            });
            list.innerHTML = html.join('');
        });
    }
};

list.onscroll = function () {
    if (this.offsetHeight + this.scrollTop >= this.scrollHeight) {
        page1++;
        let offset = (page1 - 1) * 10;
        const value = currentValue1 || 'adventure';
        renderAnime(offset, value, (result) => {
            const html2 = result.data.map((item) => {
                return `<div class="col l-12">
                        <a href="#">
                            <div class="item">
                                <img src="${item.attributes.posterImage.original}" alt="" />
                                <div class="description">
                                    <h2>${item.attributes.canonicalTitle}</h2>
                                </div>
                            </div>
                        </a>
                    </div>`;
            });
            html = [...html, ...html2];
            list.innerHTML = html.join('');
        });
    }
};

//-------------------------------------------------------------------------

function renderAnime(offset, value, callback) {
    fetch(`https://kitsu.io/api/edge/anime?filter[categories]=${value}&page[limit]=10&page[offset]=${offset}`, {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
        },
    })
        .then((res) => res.json())
        .then(callback);
}

renderAnime(0, 'adventure', (result) => {
    html = result.data.map((item) => {
        return `<div class="col l-12">
                    <a href="#">
                        <div class="item">
                            <img src="${item.attributes.posterImage.original}" alt="" />
                            <div class="description">
                                <h2>${item.attributes.canonicalTitle}</h2>
                            </div>
                        </div>
                    </a>
                </div>`;
    });
    list.innerHTML = html.join('');
});
