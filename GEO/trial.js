const fs = require('fs');
const path = require('path');

const countriesPath = path.join(
  __dirname,
  '../countries_mine.json'
);
const citiesPath = path.join(__dirname, '../cities_mine.json');
// combine countries_2 with cities_2
let countriesData = JSON.parse(fs.readFileSync(countriesPath, 'utf8'));
countriesData = countriesData.map((country, idx) => ({
  ...country,
  id: idx + 1
}));
fs.writeFile('countries_mine.json', JSON.stringify(countriesData), function(
  err
) {
  if (err) throw err;
  console.log('Saved!');
});
console.log(countriesData.length);
// process.exit();
let citiesData = JSON.parse(fs.readFileSync(citiesPath, 'utf8'));
const citiesToBeRemoved = [];
citiesData = citiesData.map((city, idx) => {
  const countryIDx = countriesData.findIndex(country => {
    return country.code === city.country_code;
  });
  if (countryIDx === -1) {
    citiesToBeRemoved.push(idx);
    // console.log('no country for: ' + city.code);
    return city;
  }
  console.log('​countryIDx', countryIDx);
  let newCity = {
    ...city,
    id: idx + 1,
    country_id: countriesData[countryIDx]['id']
  };
  return newCity;
});

citiesData = citiesData.filter((city, idx) => !citiesToBeRemoved.includes(idx));

fs.writeFile('cities_mine.json', JSON.stringify(citiesData), function(err) {
  if (err) throw err;
  console.log('Saved!');
});
