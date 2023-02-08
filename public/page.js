
//////////////////////////////////////////////////////////////////// for all data
fetch("http://localhost:8000/appdata").then(async (data) => {
  let authors = await data.json();
  authors.map((author) => {
    createCard(author);
  })
}).catch((error) => console.error("FETCH ERROR:", error.message));

//////////////////////////////////////////////////////////////////// search api

function searchData() {
  var Item = document.getElementById("searchItem").value;
  fetch("http://localhost:8000/appdata/search?searchItem=" + Item).then(async (data) => {
    let authors = await data.json();
    console.log(authors)
    document.getElementById('cardContainer').innerHTML = ""
    if (authors.total_results > 0) {
      authors.results.map((author) => {
        createCard(author);
      })
    } else {
      document.getElementById("message").innerHTML = "Data Not Found"
    }
  }).catch((error) => console.error("FETCH ERROR:", error.message));
}
/////////////////////////////////////////////////////////////////// createcard function

function createCard(author) {
  let IMG_URL = 'https://image.tmdb.org/t/p/w500/';
  let card = document.createElement('div');
  let content = `
    <div class=col>
    <div class=card  style='width: 18rem; max-height:100rem '>
    <img src=${IMG_URL + author.poster_path} class=card-img-top >
    <div class=card-body>
    <h5 class=card-title>${author.original_title}</h5>
    <p class=card-text>${author.overview}</p>
    </div>
    <ul class=list-group list-group-flush>
    <li class=list-group-item> <b>Ratings</b> ${author.vote_average}</li>
    <li class=list-group-item><b>Movie Type</b>${author.genre_ids}</li>
    </ul>
    </div>
    </div>`
  card.innerHTML = content;
  document.getElementById('cardContainer').appendChild(card);
}