const { json } = require("express");
const express = require("express");
const appRouter = express.Router();
const getData = require("../controller/getData");
const searchData = require("../controller/searchData");
const fs = require("fs");
let str = fs.readFileSync("genre.json");
var generobj = JSON.parse(str);
// console.log(generobj);

appRouter.get("/", async (req, res) => {
  let dataObj = await getData();
  dataObj = dataObj.data.results.map((item) => {
    let { original_title, poster_path, vote_average, genre_ids, overview } =
      item;
    genre_ids.forEach((element, index) => {
      genre_ids[index] = generobj.genres.find(
        (genre) => element == genre.id
      ).name;
    });
    return { original_title, poster_path, vote_average, genre_ids, overview };
  });
  res.send(dataObj);
});

appRouter.get("/search", async (req, res) => {
  try {
    let searchItem = req.query.searchItem;
    const searchObj = await searchData(searchItem);
    res.send(searchObj.data);
  } catch (error) {
    res.send(error);
  }
});

module.exports = appRouter;
