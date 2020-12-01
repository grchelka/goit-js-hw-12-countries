import "./css/styles.css";
import countryCardTpl from "./templates/country-card.handlebars";
import countryListTpl from "./templates/country-list.handlebars";
import API from "./js/fetchCountries.js";
const debounce = require("lodash.debounce");

const refs = {
  searchInput: document.querySelector(".js-search-input"),
  cardContainer: document.querySelector(".js-card-container"),
};

refs.searchInput.addEventListener("input", debounce(onSearch, 500));

function onSearch(event) {
  const searchQuery = event.target.value;
  if (searchQuery) {
    API.fetchCountries(searchQuery).then(renderResponse).catch(onFetchError);
  }
}
function renderResponse(response) {
  if (response.length === 1) {
    renderCountryCard(response[0]);
  } else if (response.length >= 2 && response.length <= 10) {
    renderCountryList(response);
  } else {
    refs.cardContainer.innerHTML = "";
    console.log("too many countries are found");
  }
}

function renderCountryCard(country) {
  console.log(country);
  const markup = countryCardTpl(country);
  refs.cardContainer.innerHTML = markup;
}

function renderCountryList(countries) {
  const markup = countryListTpl(countries);
  refs.cardContainer.innerHTML = markup;
  console.log("it is a list of ten countries");
}

function onFetchError(error) {
  alert("Error, result isn't found");
  console.log(error);
}
