const apiKey = 'VkjEryKWgyPtf5qhtX3CnZwX637DEGfee2Mamnkh'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks'

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
    return queryItems.join('&');
  }

function getParkInfo(query, maxResults){
    const params = { 
        key: apiKey,
        q: query,
        limit: maxResults,
    };
    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;
    console.log(url);
};






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