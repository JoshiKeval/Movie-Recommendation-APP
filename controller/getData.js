const axios = require("axios");

const options = {
  method: "GET",
  url: "https://api.themoviedb.org/3/movie/top_rated?api_key=ea18d74736f4bb39c6d42fbcacdbd96f&language=en-US",
};

function apiData() {
  return axios.request(options);
}

module.exports = apiData;
