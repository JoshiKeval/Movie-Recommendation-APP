const axios=require("axios");
const querystring=require("querystring");

function byPeople(searchPeople){
    const option={
        method:"GET",
        url:"https://api.themoviedb.org/3/search/person?api_key=ea18d74736f4bb39c6d42fbcacdbd96f&query="+searchPeople
    }
    console.log(option.url);
    return axios.request(option);
}

module.exports = byPeople