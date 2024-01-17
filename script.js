const formatCountries = (countries) => {
  const countriesList = countries.map((country) => {
    return {
      name: country.name.common,
      flag: country.flag,
      population: country.population,
    };
  });
  return countriesList;
};

const getCountries = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const countries = await response.json();

  const formattedCountries = formatCountries(countries);

  return formattedCountries;
};

const renderCountries = async () => {
  const countries = await getCountries();

  const countriesSelect = document.querySelector('#countries');

  countries.forEach((country) => {
    const option = document.createElement('option');
    option.value = country.name;
    option.innerHTML = country.name;
    countriesSelect.appendChild(option);
  });

  if (countries.length > 0) {
    countriesSelect.disabled = false;
  }
};
