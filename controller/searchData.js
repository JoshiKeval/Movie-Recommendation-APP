const axios = require("axios");
const querystring = require('querystring');



function searchData(searchItem) {
 const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/search/movie?api_key=ea18d74736f4bb39c6d42fbcacdbd96f&language=en-US&query="+searchItem,
  };
  return axios.request(options);
}

module.exports = searchData;
