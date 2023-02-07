const express = require("express");
const appRouter = express.Router();
const getData = require("../controller/getData");

appRouter.get("/", async (req, res) => {
 let dataObj =await getData();
  dataObj = dataObj.data.results.map((item) => {
    let { original_title, poster_path, vote_average, genre_ids, overview } =
      item;
    return { original_title, poster_path, vote_average, genre_ids, overview };
  });
  res.send(dataObj);
});


module.exports = appRouter;
