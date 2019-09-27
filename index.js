/* eslint-disable no-console */
const apiKey = 'VkjEryKWgyPtf5qhtX3CnZwX637DEGfee2Mamnkh'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`);
  return queryItems.join('&');
}

function displayResults(responseJson) {
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++) {
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}<h3>
      <p>${responseJson.data[i].description}</p>
      <a href=${responseJson.data[i].url}>Visit Website</a>
      </li>`
    );
  }
  $('#results').removeClass('hidden');
}

function getParkInfo(query, maxResults){
  const params = { 
    api_key: apiKey,
    q: query,
    limit: maxResults,
  };
  const queryString = formatQueryParams(params);
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



function parksForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParkInfo(searchTerm, maxResults);
  });
}



function parksFinder(){
  parksForm();
}




$(parksFinder);