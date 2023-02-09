const { json } = require("express");
const express = require("express");
const appRouter = express.Router();
const getData = require("../controller/getData");
const searchData = require("../controller/searchData");
const byPeople = require("../controller/byPeople");
const fs = require("fs");
let str = fs.readFileSync("genre.json");
var generobj = JSON.parse(str);
// console.log(generobj);

/////////////////////////////////////////////////////////////////////////////////// CHANGE-GEGENRE

function changeGenre(genre_ids) {
  genre_ids.forEach((element, index) => {
    // console.log(genre_ids)
    let item = generobj.genres.find((genre) => element == genre.id);
    genre_ids[index] = item ? item.name : "";
  });
}

/////////////////////////////////////////////////////////////////////////////////// GET  DATA FOR MAIN PAGE

appRouter.get("/", async (req, res) => {
  let dataObj = await getData();
  dataObj = dataObj.data.results.map((item) => {
    let { original_title, poster_path, vote_average, genre_ids, overview } =
      item;
    changeGenre(genre_ids);
    return { original_title, poster_path, vote_average, genre_ids, overview };
  });
  res.send(dataObj);
});

////////////////////////////////////////////////////////////////////////////////// SEARCH OPTION

// appRouter.get("/search", async (req, res) => {
//   try {
//     let searchItem = req.query.searchItem;
//     let searchObj = await searchData(searchItem);
//     // console.log(searchObj.data)
//     let searchObj1 = searchObj.data.results.map((item) => {
//       let { original_title, poster_path, vote_average, genre_ids, overview } =
//         item;
//       changeGenre(genre_ids);
//       let obj = {
//         original_title,
//         poster_path,
//         vote_average,
//         genre_ids,
//         overview,
//       };
//       return obj;
//     });
//     res.send({
//       results: searchObj1,
//       total_results: searchObj.data.total_results,
//     });
//   } catch (error) {
//     res.send(error);
//   }
// });

// appRouter.get("/bypeople", async (req, res) => {
//   try {
//     let searchPeople = req.query.searchPeople;
//     searchPeople = encodeURIComponent(searchPeople);
//     searchPeople = searchPeople.replace(/and/gi, "%26");
//     let searchPeopleObj = await byPeople(searchPeople);
//     let searchPeopleObj1 = searchPeopleObj.data.results.filter((element) => {
//       return element.known_for_department == "Acting";
//     });
//     let movies = [];
//     searchPeopleObj1.forEach((item) => {
//       item.known_for.forEach((movie) => {
//         let { original_title, poster_path, vote_average, genre_ids, overview } =
//           movie;
//         changeGenre(genre_ids);
//         movies.push({
//           original_title,
//           poster_path,
//           vote_average,
//           genre_ids,
//           overview,
//         });
//       });
//     });
//     res.send({
//       results: movies,
//       total_results: searchPeopleObj.data.total_results,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

appRouter.get("/allserch", async (req, res) => {
  let searchItem = req.query.searchItem;
  let result1 = await searchbypeople(searchItem);
  let result2 = await searchbymovie(searchItem);
  let totaldata = result1.total_result_people + result2.total_result_movie;
  let finalresult = [...result1.movies, ...result2.searchObj];
  res.send({ results: finalresult, total_results: totaldata });
});

async function searchbypeople(searchItem) {
  searchItem = encodeURIComponent(searchItem);
  searchItem = searchItem.replace(/and/gi, "%26");
  let searchPeopleObj = await byPeople(searchItem);
  let total_result_people = searchPeopleObj.data.total_results;
  let searchPeopleObj1 = searchPeopleObj.data.results.filter((element) => {
    return element.known_for_department == "Acting";
  });
  let movies = [];
  searchPeopleObj1.forEach((item) => {
    item.known_for.forEach((movie) => {
      let { original_title, poster_path, vote_average, genre_ids, overview } =
        movie;
      changeGenre(genre_ids);
      movies.push({
        original_title,
        poster_path,
        vote_average,
        genre_ids,
        overview,
      });
    });
  });
  return { movies, total_result_people };
}

async function searchbymovie(searchItem) {
  searchItem = encodeURIComponent(searchItem);
  searchItem = searchItem.replace(/and/gi, "%26");
  let searchObj = await searchData(searchItem);
  let total_result_movie = searchObj.data.total_results;
  // console.log(searchObj.data)
  searchObj = searchObj.data.results.map((item) => {
    let { original_title, poster_path, vote_average, genre_ids, overview } =
      item;
    changeGenre(genre_ids);
    return { original_title, poster_path, vote_average, genre_ids, overview };
  });
  return { searchObj, total_result_movie };
}

module.exports = appRouter;
