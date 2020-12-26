import './styles.css';
import countryTemplate from "../src/countryTemplate.hbs";
import countryListTemplate from "./countryListTemplate.hbs"
import debounce from "lodash.debounce";
import toastr from "toastr";
import fetchCountries from "./fetchCountries";

// import bootstrap from 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';

// const debounce = require('lodash.debounce')

const inputRef = document.querySelector('.js-search');
const countriesRef = document.querySelector('.card')

inputRef.addEventListener('input', (debounce(e => search(e), 500)))
fetchCountries("sweden").then((countriesArray) => renderCountries(countriesArray))
function search(e) {
    const searchQuery = e.target.value
    if (searchQuery === "") return
    fetchCountries(searchQuery).then(renderCountries).catch(err => toastr.error(err))
}

function renderCountries(array) {
    countriesRef.innerHTML = ""
    
    if (array.length >= 10)  showNotification() 
    else if (array.length === 1) addCardInfo(array)
    else addListOfMatches(array)
}

function showNotification() {
toastr.warning("Too many results! Please, specify your query.")
toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "1000",
  "hideDuration": "1000",
  "timeOut": "1000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
}
function addCardInfo(array) {
    toastr.clear()
    const card = countryTemplate(array)
    countriesRef.insertAdjacentHTML('beforeend', card)
}
function addListOfMatches(array) {
    toastr.clear()
    countriesRef.insertAdjacentHTML('beforeend',countryListTemplate(array) )
    // const names = array.map((obj) => obj.name)
    //     names.forEach(name => {
    //         countriesRef.insertAdjacentHTML('beforeend', `<li class="countries-el">${name}</li>`)
    //     });
}