'use strict'

//JSON source:
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

//Filter JSON:
fetch(endpoint)
  .then(blob => blob.json())
  //Spread the data into the array to avoid each new city from becoming it's own array item.
  .then(data => cities.push(...data))

  function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
      //Figure out if cities matches search.
      //'gi'= global + insensitive.  Will search regargless of case. 
      const regex = new RegExp(wordToMatch, 'gi')
      return place.city.match(regex) || place.state.match(regex)
    });
  }

  //Place commas function.
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  //Display function.
  function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    // console.log(matchArray);
    const html = matchArray.map(place => {
      //Must be searchable regardless of case ~ gi.
      const regex = new RegExp(this.value, 'gi');
      const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
      const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
      return `
        <li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class ="population">${numberWithCommas(place.population)}</span>
        </li>
      `;
    }).join('');
    suggestions.innerHTML = html;
  }

  //Selectors:
  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  //EventListeners:
  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', displayMatches);