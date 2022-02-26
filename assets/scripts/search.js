const searchBtn = document.querySelector('.search-btn');
const searchWin = document.querySelector('.search-window');
const closeBtn = document.querySelector('.close-btn');
const searchInput = document.querySelector('.search-bar input');
const findBtn = document.querySelector('.search-bar i');
const searchErr = document.querySelector('.search-error');
const searchList = document.querySelector('.search-list');
let items = '';
let page2 = 1;
let currentValue = '';

searchBtn.onclick = function (e) {
    searchWin.style.width = '100%';
    searchWin.style.height = '100vh';
    searchWin.style.backgroundColor = 'rgba(0, 0, 0, 1)';
};

closeBtn.onclick = function () {
    searchWin.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    setTimeout(() => {
        searchWin.style.width = '0';
        searchWin.style.height = '0';
    }, 300);
    searchInput.value = '';
    searchList.style.display = 'none';
    searchErr.innerText = '';
    findBtn.classList.add('default');
};

findBtn.onclick = function () {
    const value = '' || searchInput.value.trim();
    if (value != '') {
        renderSearch(0, value, (result) => {
            const data = result.data;
            if (data.length == 0) {
                // display none
                searchList.style.display = 'none';
                searchErr.innerText = "Can't find Anime";
            } else {
                page2 = 1;
                currentValue = searchInput.value.trim();
                searchList.style.display = 'flex';
                items = result.data.map((item) => {
                    return `<div class ="col l-2" >
                            <a href="#">
                                <div class="search-item">
                                    <img src="${item.attributes.posterImage.original}" alt="" />
                                    <div class="search-item-description">
                                        <span>${item.attributes.canonicalTitle}</span>
                                    </div>
                                </div>
                            </a>
                        </div>`;
                });
                searchList.innerHTML = items.join('');
                searchList.scrollLeft = 0;
            }
        });
    }
};

searchInput.oninput = function () {
    const value = searchInput.value.trim();
    searchErr.innerText = '';
    if (value == '') {
        findBtn.classList.add('default');
    } else {
        findBtn.classList.remove('default');
    }
};

searchList.onscroll = function () {
    if (this.offsetWidth + this.scrollLeft >= this.scrollWidth) {
        page2++;
        let offset = (page2 - 1) * 10;
        const value = currentValue;
        renderSearch(offset, value, (result) => {
            const items2 = result.data.map((item) => {
                return `<div class ="col l-2" >
                            <a href="#">
                                <div class="search-item">
                                    <img src="${item.attributes.posterImage.original}" alt="" />
                                    <div class="search-item-description">
                                        <span>${item.attributes.canonicalTitle}</span>
                                    </div>
                                </div>
                            </a>
                        </div>`;
            });
            items = [...items, ...items2];
            searchList.innerHTML = items.join('');
        });
    }
};

//-----------------------------------------------------------------
function renderSearch(offset, value, callback) {
    fetch(`https://kitsu.io/api/edge/anime?filter[text]=${value}&page[limit]=10&page[offset]=${offset}`, {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
        },
    })
        .then((res) => res.json())
        .then(callback);
}

//offset = (page - 1) * itemsPerPage
