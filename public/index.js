const app = function(){
    const url = "https://restcountries.eu/rest/v2/all";
    makeRequest(url, requestComplete);

    const showCountriesButton = document.getElementById("button-populate-countries");

    const getCountriesButtonClicked = function () {
      makeRequest(url, requestComplete);
    }

    showCountriesButton.addEventListener("click", getCountriesButtonClicked);

    // const dropdown = document.querySelector("select");
    // const option = document.createElement('option');
    // const countries =
    // option.innerText =
    //
    // dropdown.appendChild(option);


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

  countries.forEach(function (country) {
    const option = document.createElement("option");
    option.innerText = country.name;
    dropdown.appendChild(option);
  });
}




document.addEventListener('DOMContentLoaded', app);
