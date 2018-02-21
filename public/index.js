const app = function(){
    const url = "https://restcountries.eu/rest/v2/all";
    makeRequest(url, requestComplete);

    const showCountriesButton = document.getElementById("button-populate-countries");

    const getCountriesButtonClicked = function () {
      makeRequest(url, requestComplete);
    }

    showCountriesButton.addEventListener("click", getCountriesButtonClicked);

    // const selectCountry = document.querySelector('select');
    // selectCountry.addEventListener('change', handleSelectChanged);

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
    console.log(countries);

    const pTag = document.getElementById("country-info");

    const selectedCountry = countries[this.value];
    console.log(selectedCountry);


    pTag.innerText = `Country name: ${selectedCountry.name}  Population: ${selectedCountry.population}  Capital City: ${selectedCountry.capital}`
  }
  dropdown.addEventListener('change', handleSelectChanged);

}







document.addEventListener('DOMContentLoaded', app);
