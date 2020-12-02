import "./css/styles.css";
import { alert, notice, info, success, error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
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
    alert({
      text: "Too many matches found. Please, enter a more specific query.",
      type: "info",
      delay: 1000,
      closer: false,
      sticker: false,
      hide: true,
      autoOpen: true,
    });
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
}

function onFetchError(error) {
  alert("Not found");
}
