const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

const cities = [];
fetch(endpoint).then(data => data.json()).then(data => cities.push(...data));

function findMatches(wordToMatch, places) {
    return places.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
}

function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const placeState = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        const placeCity = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const placePopulation = numberWithCommas(place.population);
        return `
            <li>
                <span class="name">${placeCity}, ${placeState}</span>
                <span class="population">${placePopulation}</span>
            </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

searchInput.addEventListener('input', displayMatches);
