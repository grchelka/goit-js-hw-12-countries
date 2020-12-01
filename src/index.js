import "./css/styles.css";
const debounce = require("lodash.debounce");
import countryCardTpl from "./templates/country-card.handlebars";
import countryListTpl from "./templates/country-list.handlebars";
import API from "./js/fetchCountries.js";

const refs = {
  searchForm: document.querySelector(".js-search"),
  cardContainer: document.querySelector(".js-card-container"),
};

refs.searchForm.addEventListener("submit", debounce(onSearch, 500));

function onSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const searchQuery = form.elements.query.value;

  API(searchQuery)
    .then(renderCountryCard)
    .catch(onFetchError)
    .finally(() => form.reset());
}

function renderCountryCard(country) {
  const markup = countryCardTpl(country);
  if (country.length === 1) {
    refs.cardContainer.innerHTML = markup;
  } else if (country.length >= 2 && country.length <= 10) {
    console.log("it is a list of 10 countries");
    const markup = countryListTpl(country);
    refs.cardContainer.innerHTML = markup;
  } else if (country.length > 10) {
    console.log("too many");
  }
}

function onFetchError(error) {
  alert("Error, result isn't found");
  console.log(error);
}
