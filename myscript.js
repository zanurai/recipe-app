//alert('hello');
const searchForm = document.querySelector('form');
const images = document.querySelector(".images");
const container = document.querySelector('.container')
let Query = '';
const APIKEY = 'd369dbbc52da34229141c317e5ce1cf6';
const APP_ID = '50747022'

//const baseUrl = `https://api.spoonacular.com/recipes/complexSearch?apikey=${APIKEY}q=${query}`
//for submit it have to listen

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;//input bata value gain garna
    Query = searchQuery;
    console.log(searchQuery)
    fetchAPI()
});

//for fetch api
const fetchAPI = async () => {

    //const baseUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&q=${Query}&$to-20`;
    const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${Query}&app_id=${APP_ID}&app_key=${APIKEY}`//app key nai lekhnu parxa
    const res = await fetch(baseUrl);
    const data = await res.json()
    const sliceResult = data.hits//.slice(0, 20);
    generateHTML(sliceResult);
    const totalResults = data.totalResults
    console.log(`Total Result:${totalResults}`)
    console.log(data)
    //console.log(res)
}

const generateHTML = (results) => {
    let generatedHTML = "";

    results.map(item => {
        generatedHTML += `<div class="img1">
                        <img id="${item.id}" src="${item.recipe.image}">
                        <h2 class="title">${item.recipe.label}</h2>
                        <button><a href="${item.recipe.url}" target"_blank">ViewRecipe</a></button>
                    </div>`

    })

    images.innerHTML = generatedHTML;
    const imageContainer = document.querySelectorAll(".img1")
    imageContainer.forEach(container => {//container refers the parentNode of img1
        container.parentNode.style.display = 'flex';//parentNode le chai parent element element get garna use hunxa
        container.parentNode.style.flexWrap = 'wrap';
        container.parentNode.style.overflowX = 'scroll';

    })

}