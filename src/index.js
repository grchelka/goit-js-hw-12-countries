import "./css/styles.css";
const debounce = require("lodash.debounce");
import countryCardTpl from "./templates/country-card.handlebars";
import API from "./js/fetchCountries.js";

const refs = {
  searchForm: document.querySelector(".form-input"),
  cardContainer: document.querySelector(".js-card-container"),
};

refs.searchForm.addEventListener("input", debounce(onSearch, 500));

function onSearch(event) {
  event.preventDefault();

  const searchQuery = refs.searchForm.value;

  API(searchQuery).then(renderCountryCard).catch(onFetchError);
}

function renderCountryCard(country) {
  const markup = countryCardTpl(country);
  if (country.length === 1) {
    refs.cardContainer.innerHTML = markup;
  } else if (country.length >= 2 && country.length <= 10) {
    console.log("it is a list of 10 countries");
  } else if (country.length > 10) {
    console.log("too many");
  }
}

function onFetchError(error) {
  alert("Error, result isn't found");
  console.log(error);
}
