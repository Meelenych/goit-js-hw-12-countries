import './sass/main.scss';
// import './js/fetchCountries.js';
import debounce from "lodash/debounce";
import Notiflix from "notiflix";

//=================================================================================
const searchBox = document.getElementById("search_form");
// console.log(searchBox);

const countryCard = document.getElementById("country_card");
// console.log(countryCard);
//=================================================================================
   
    searchBox.addEventListener('input', debounce((e) => {
        let searchQuery = e.target.value;
        
        fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}?fields=name;capital;population;languages;flag`)
        
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    throw new Error(`No matches found!`)
                }
            })
                    
            .then((array) => {
                if (array.length > 10) {
                    Notiflix.Notify.failure('Too many matches found!');
                    throw new Error(`Too many matches found!`);
                }
                return array
            })

            .then((array) => {
            console.log('array', array)

            let items = array.map((item) => {
                const { flag, name, capital, languages, population } = item
                
                if (array.length <= 10 && array.length >= 2) {
                Notiflix.Notify.warning('Please specify your request!');    
                    return `<ul>
                    
                    <li> ${name}</li>
                   
                </ul>`}
                // 
                else if (array.length === 1) {
                    Notiflix.Notify.success('Success! Country found!')
                    return `<ul>
                    <li><img src="${flag}" alt="flag" width="300" /></li>
                    <li><b>Country name:</b> ${name}</li>
                    <li><b>Capital:</b> ${capital}</li>
                    <li>
                    <b>Languages:</b>
                    <ul>
                        ${languages.map((language) => {
                        const { name } = language
                        return `<li>${name}</li>`
                    })}
                    </ul>
                    </li>
                    <li><b>Population:</b> ${population} people</li>
                </ul>`} 
                
            })
                .join('')
            // console.log('items', items);
            countryCard.insertAdjacentHTML('afterbegin', items)              
            })

           .catch(err => {
            console.log(err)
            })
    
        // console.log('e.target.value:', e.target.value);
        console.log('searchQuery', searchQuery);
        clearQuery()
    }), 1000)

function clearQuery() {
  countryCard.innerHTML = '';
}

// console.log(debounce)

// const getCountries = function (e) {
    
// }