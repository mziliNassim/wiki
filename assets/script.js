// DOM
const formDOM = document.querySelector("form");
const inputDOM = document.querySelector(".form-input");
const resultsDOM = document.querySelector(".results");

// API url
const url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";

// Event
formDOM.addEventListener("submit", (e) => {
  e.preventDefault();
  checkForm();
});

// Functions
let checkForm = () => {
  let value = inputDOM.value;
  if (!value) {
    // Empty Search Bar
    resultsDOM.innerHTML = `
      <div class="error"> please enter valid search term</div>
    `;
    return;
  }
  fetchUrl(value);
};

let fetchUrl = async (searchTerm) => {
  // data loding...
  resultsDOM.innerHTML = '<div class="loading"></div>';
  inputDOM.value = "";

  try {
    // Get API response
    let response = await fetch(`${url}${searchTerm}`);
    let data = await response.json();
    let results = data.query.search;

    // resuslt for term search == 0
    if (results.length < 1) {
      resultsDOM.innerHTML = `
        <div class="error">no matching results. Please try again</div>
      `;
      return;
    }
    renderResults(results);
  } catch (error) {
    // error || Internet problem || ...
    console.log("fetchUrl ~ error:", error);
    resultsDOM.innerHTML = '<div class="error"> there was an error...</div>';
  }
};

let renderResults = (list) => {
  // set Result in result UI
  resultsDOM.innerHTML = "";

  // Create div.articles
  let articles = document.createElement("div");
  articles.setAttribute("class", "articles");
  resultsDOM.appendChild(articles);

  // maping && insert results in artcles UI
  list.map((item) => {
    let { title, snippet, pageid } = item;
    articles.innerHTML += `
      <a href=http://en.wikipedia.org/?curid=${pageid} target="_blank">
        <h4>${title}</h4>
        <p> ${snippet} </p>
      </a>
      `;
  });
};
