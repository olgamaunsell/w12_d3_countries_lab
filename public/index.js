const app = function(){
    const url = "https://restcountries.eu/rest/v2/all";
    makeRequest(url, requestComplete);

    const showCountriesButton = document.getElementById("button-populate-countries");

    const getCountriesButtonClicked = function () {
      makeRequest(url, requestComplete);
    }

    showCountriesButton.addEventListener("click", getCountriesButtonClicked);
}

const makeRequest = function (url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
  // console.log("request complete");
}

const requestComplete = function () {
  // console.log("callback called");
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  // console.log(jsonString);
  const countries = JSON.parse(jsonString);
  // console.log(countries[0]);
  populateDropdown(countries);
}

const populateList = function (countries) {
  // console.log(countries);
  const countryList = document.getElementById("country-list");

  countries.forEach(function (country) {
    const li = document.createElement("li");
    li.innerText = country.name;
    countryList.appendChild(li);
  });
}

const populateDropdown = function (countries) {
  // console.log(countries);
  const dropdown = document.querySelector("select");

  countries.forEach(function (country, index) {
    const option = document.createElement("option");
    option.value = index;
    option.innerText = country.name;
    dropdown.appendChild(option);
  });

  const handleSelectChanged = function () {
    const selectedCountry = countries[this.value];

    const ul = document.getElementById("country-info");
    ul.innerHTML = "";
    const name = document.createElement('li');
    name.innerText = `Country name: ${selectedCountry.name}`
    const population = document.createElement('li');
    population.innerText = `Population: ${selectedCountry.population}`;
    const capital = document.createElement('li');
    capital.innerText = `Capital City: ${selectedCountry.capital}`;



    // const borders = document.createElement('li');
    // borders.innerText = "Borders: " + bordersArray;

    ul.appendChild(name);
    ul.appendChild(population);
    ul.appendChild(capital);

    //
    // const bordersArray = [];
    const borderUl = document.getElementById("border-info");
    borderUl.innerHTML = "";
    const borders = selectedCountry.borders;

    if (borders.length !== 0){
      console.log("borders");
      borderUl.innerText = "Borders:";
    }
    borders.forEach(function (border) {
      countries.forEach(function (country) {
        if(country.alpha3Code === border){
          const name = document.createElement('li');
          name.innerText = `Country name: ${country.name}`
          const population = document.createElement('li');
          population.innerText = `Population: ${country.population}`;
          const capital = document.createElement('li');
          capital.innerText = `Capital City: ${country.capital}`;
          const lineBreak = document.createElement('br');

          borderUl.appendChild(name);
          borderUl.appendChild(population);
          borderUl.appendChild(capital);
          borderUl.appendChild(lineBreak);

        }
      })
    })

    const jsonString = JSON.stringify(selectedCountry);
    localStorage.setItem('last country', jsonString);
  }
  dropdown.addEventListener('change', handleSelectChanged);

}







document.addEventListener('DOMContentLoaded', app);
