var date = new Date();

export default function renderAnime(offset, callback) {
    fetch(
        `https://kitsu.io/api/edge/anime?filter[seasonYear]=${date.getFullYear()}&page[limit]=12&page[offset]=${offset}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
            },
        }
    )
        .then((res) => res.json())
        .then(callback);
}

renderAnime(0, (result) => {
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
