const url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

const formDOM = document.querySelector('.form');
const inputDOM = document.querySelector('.form-input');
const resultsDOM = document.querySelector('.results');

setInterval(()=>{
    if (resultsDOM.innerHTML !== '') {
        resultsDOM.style.background = "#FFF";
    }
}, 500)

formDOM.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = inputDOM.value;
    if (!value) {
        // Empty Search Bar
        resultsDOM.innerHTML = '<div class="error"> please enter valid search term</div>';
        return;
    }
    fetchPages(value);
});

const fetchPages = async (searchValue) => {
    // data loding...
    resultsDOM.innerHTML = '<div class="loading"></div>';

    try {
        const response = await fetch(`${url}${searchValue}`);
        const data = await response.json();
        const results = data.query.search;
    
        // resuslt for term search == 0
        if (results.length < 1) {
            resultsDOM.innerHTML =
            '<div class="error">no matching results. Please try again</div>';
            return;
        }
        renderResults(results);
    }
    catch(error) {
        // error date fetch // Internet problem
        resultsDOM.innerHTML = '<div class="error"> there was an error...</div>';
    }
}

const renderResults = (list) => {
    // Include Result in 'div result'
    const cardsList = list
    .map((item) => {
        const { title, snippet, pageid } = item;
        return `<a href=http://en.wikipedia.org/?curid=${pageid} target="_blank"> 
                    <h4>${title}</h4>
                    <p> ${snippet} </p>
                </a>`
    })
    .join('');

    resultsDOM.innerHTML = `<div class="articles">${cardsList}</div>`;
}
