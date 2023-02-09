//////////////////////////////////////////////////////////////////// for all data
fetch("http://localhost:8000/appdata")
  .then(async (data) => {
    let authors = await data.json();
    authors.map((author) => {
      createCard(author);
    });
  })
  .catch((error) => console.error("FETCH ERROR:", error.message));

//////////////////////////////////////////////////////////////////// search api
// function searchData() {
//   var Item = document.getElementById("searchItem").value;
//   fetch("http://localhost:8000/appdata/search?searchItem=" + Item)
//     .then(async (data) => {
//       let authors = await data.json();
//       console.log(authors);
//       document.getElementById("cardContainer").innerHTML = "";
//       if (authors.total_results > 0) {
//         authors.results.map((author) => {
//           createCard(author);
//         });
//       } else {
//         let messContainer = document.createElement("div");
//         messContainer.classList.add("alert");
//         messContainer.classList.add("alert-danger");
//         messContainer.innerHTML =
//           "Sorry, the requested information is currently not available in our database. Please try again....";
//         document.getElementById("cardContainer").appendChild(messContainer);
//         // document.getElementById("message").innerHTML = "Sorry, the requested information is currently not available in our database. Please try again...."
//       }
//     })
//     .catch((error) => console.error("FETCH ERROR:", error.message));
// }

function searchData() {
  var Item = document.getElementById("searchItem").value;

fetch("http://localhost:8000/appdata/allserch?searchItem=" + Item)
    .then(async (data) => {
      let authors = await data.json();
      console.log("hello")
      console.log(authors);
      document.getElementById("cardContainer").innerHTML = "";
      if (authors.total_results > 0) {
        authors.results.map((author) => {
          createCard(author);
          console.log(author)
        });
      } else {
        let messContainer = document.createElement("div");
        messContainer.classList.add("alert");
        messContainer.classList.add("alert-danger");
        messContainer.innerHTML =
          "Sorry, the requested information is currently not available in our database. Please try again....";
        document.getElementById("cardContainer").appendChild(messContainer);
        // document.getElementById("message").innerHTML = "Sorry, the requested information is currently not available in our database. Please try again...."
      }
    })
    .catch((error) => console.error("FETCH ERROR:", error.message));















  // fetch("http://localhost:8000/appdata/search?searchItem=" + Item)
  //   .then(async (data) => {
  //     let authors = await data.json();
  //     console.log(authors);
  //     document.getElementById("cardContainer").innerHTML = "";
  //     if (authors.total_results > 0) {
  //       authors.results.map((author) => {
  //         createCard(author);
  //         console.log(author)
  //       });
  //     } else {
  //       let messContainer = document.createElement("div");
  //       messContainer.classList.add("alert");
  //       messContainer.classList.add("alert-danger");
  //       messContainer.innerHTML =
  //         "Sorry, the requested information is currently not available in our database. Please try again....";
  //       document.getElementById("cardContainer").appendChild(messContainer);
  //       // document.getElementById("message").innerHTML = "Sorry, the requested information is currently not available in our database. Please try again...."
  //     }
  //   })
  //   .catch((error) => console.error("FETCH ERROR:", error.message));

  //   Item = encodeURIComponent(Item);
  //   Item = Item.replace(/and/ig, "%26");
  // console.log(Item);
  //   fetch("http://localhost:8000/appdata/bypeople?searchPeople=" + Item)
  //     .then(async (data) => {
  //       let authors = await data.json();
  //       console.log(authors);
  //       document.getElementById("cardContainer").innerHTML = "";
  //       if (authors.total_results > 0) {
  //         authors.results.map((author) => {
  //           createCard(author);
  //         });
  //       } else {
  //         let messContainer = document.createElement("div");
  //         messContainer.classList.add("alert");
  //         messContainer.classList.add("alert-danger");
  //         messContainer.innerHTML =
  //           "Sorry, the requested information is currently not available in our database. Please try again....";
  //         document.getElementById("cardContainer").appendChild(messContainer);
  //         // document.getElementById("message").innerHTML = "Sorry, the requested information is currently not available in our database. Please try again...."
  //       }
  //     })
  //     .catch((error) => console.error("FETCH ERROR:", error.message));
  //
}

///////////////////////////////////////////////////////////////search api for people

/////////////////////////////////////////////////////////////////// createcard function

function createCard(author) {
  let IMG_URL = "https://image.tmdb.org/t/p/w500/";
  let card = document.createElement("div");
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
    </div>`;
  card.innerHTML = content;
  document.getElementById("cardContainer").appendChild(card);
}
