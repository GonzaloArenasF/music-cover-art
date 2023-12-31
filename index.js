const url_base = 'https://spotify23.p.rapidapi.com';
const endpoints = {
    genre: '/genre_view/?id=0JQ5DAqbMKFEC4WFtoNRpw&content_limit=10&limit=40',
    search: '/search/?q=????&type=albums&offset=0&limit=20&numberOfTopResults=5'
};
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '909ab0f1ddmsh7e41cf98fba3907p1f88cajsn8cc3a5d0b454',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

function renderGender (data) {
    let genres_list = [];
    data.items.forEach(genre => genres_list.push(`<li>${genre.name}</li>`));
    document.getElementById('genres_list_loading').remove();
    document.getElementById('genres_list').insertAdjacentHTML('beforeend', genres_list.join(''));
}

function renderSearchingResults (data) {
    let article = `<article class="album">
                        <figure>
                            <img src="{cover}" alt="{artist} - {album}">
                        </figure>
                        <h4>{album}</h4>
                        <p>{artist}</p>
                        <small>{year}</small>
                    </article>`;

    data.items.forEach(item => {
        let articleData = article.replaceAll('{cover}', item.data.coverArt.sources[0].url);
        articleData = articleData.replaceAll('{artist}', item.data.artists.items[0].profile.name);
        articleData = articleData.replaceAll('{album}', item.data.name);
        articleData = articleData.replaceAll('{spotify}', item.data.uri);
        articleData = articleData.replaceAll('{year}', item.data.date.year);

        document.getElementById('albums_list').insertAdjacentHTML('beforeend', articleData);
    });
}

function searchButtonToggle (text) {
    let searchButton = document.getElementById('search_button');
    text != '' ? searchButton.disabled = false : searchButton.disabled = true;
}

async function searchAlbum () {
    document.getElementById('albums_list').innerHTML = null;
    let catalogLoading = document.getElementById('catalog_loading');
    let textToSearch = document.getElementById('text_to_search').value;
    if (textToSearch != '') {
        catalogLoading.style.display = 'initial';
        
        try {
            // Get genres
            let search = endpoints.search.replace('????', textToSearch);
            let response = await fetch(`${url_base}${search}`, options);
            let result = await response.text();
            renderSearchingResults(JSON.parse(result).albums);
        } catch (error) {
            console.error(error);
        }

        catalogLoading.style.display = 'none';
    }
}

async function getData () {
    try {
        // Get genres
        let response = await fetch(`${url_base}${endpoints.genre}`, options);
        let result = await response.text();
        renderGender(JSON.parse(result).content);
    } catch (error) {
        console.error(error);
    }
}

window.onload = function() {
    getData();

    document.getElementById('text_to_search').addEventListener("keydown", function(event) {
        if (event.key === "Enter" || event.keyCode === 13) {
            searchAlbum();
        }
      });
};