const url_base = 'https://spotify23.p.rapidapi.com';
const endpoints = {
    genre: '/genre_view/?id=0JQ5DAqbMKFEC4WFtoNRpw&content_limit=10&limit=40',
    albums: '/albums'
};
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '909ab0f1ddmsh7e41cf98fba3907p1f88cajsn8cc3a5d0b454',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

function renderGender(data) {
    let genres_list = [];
    data.items.forEach(genre => genres_list.push(`<li>${genre.name}</li>`));
    document.getElementById('genres_list').insertAdjacentHTML('afterend',genres_list.join(''));
}

async function getData () {
    try {
        // Get genres
        let response = await fetch(`${url_base}${endpoints.genre}`, options);
        let result = await response.text();
        renderGender(JSON.parse(result).content);

        response = await fetch(`${url_base}${endpoints.albums}`, options);
        result = await response.text();
        console.log(JSON.parse(result));
    } catch (error) {
        console.error(error);
    }
}

window.onload = function() {
    getData();
};