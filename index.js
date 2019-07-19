'use strict';

const searchURL = 'https://en.wikipedia.org/w/api.php';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  console.log(typeof(responseJson));
  const myResult = responseJson.query.pages;
  const pages = Object.entries(myResult);
  console.log(pages);
  console.log(pages[0][1].extract);
  $('#results-list').empty();

    $('#results-list').append(
      `<li>
      <p>${pages[0][1].extract}</p>
      </li>`);

  //display the results section  
  $('#results').removeClass('hidden');
};

function getYouTubeVideos(searchTerm) {
    
  const params = {
    action: 'query',
    // list: 'search',
    // srsearch: searchTerm,
    format: 'json',
    origin: '*',
    // pageid: '8915322', 
    prop: 'extracts',
    exintro: '', 
    explaintext: '',
    redirects: 1, 
    titles: searchTerm

  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();

    getYouTubeVideos(searchTerm);
  });
}

$(watchForm);