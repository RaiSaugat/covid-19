import React, { useState, useEffect } from 'react';
import CountryBlock from './component/countryBlock/countryBlock';
import SearchControl from './component/searchControl/searchControl';
import { useMemo } from 'react';

const API = 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats';
const Month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

function App() {
  const [covidData, setCovidData] = useState([]);
  const [lastChecked, setLastChecked] = useState();
  const [countryList, setCountryList] = useState({});
  const [filterInput, setFilteredInput] = useState('');

  useEffect(() => {
    fetch(API, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'covid-19-coronavirus-statistics.p.rapidapi.com',
        'x-rapidapi-key': '827dd03928msh9b3cda5495175b5p126e7fjsn6a79c0e7c777'
      }
    })
      .then(response => response.json())
      .then(result => {
        setLastChecked(result.data.lastChecked);
        setCovidData(result.data.covid19Stats);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    var result = covidData.reduce((prev, curr) => {
      let n = curr.country;
      if (!prev[n]) {
        prev[n] = [curr];
      } else {
        prev[n].push(curr);
      }
      return prev;
    }, {});

    setCountryList(result);
  }, [covidData]);

  //Filter out the countries when user input something
  const filteredList = useMemo(() => {
    let filObj = {};
    const filterCountry = Object.keys(countryList).filter(country =>
      country.toLowerCase().includes(filterInput.toLowerCase())
    );
    filterCountry.map(countryName => {
      filObj = { ...filObj, [countryName]: countryList[countryName] };
    });
    return filObj;
  }, [countryList, filterInput]);

  const checkedDate = new Date(lastChecked);

  const onInputChange = inputValue => {
    setFilteredInput(inputValue);
  };

  console.log(filteredList);

  return (
    <div className="App">
      <h1>COVID-19 DATA</h1>
      <h2>
        Last Checked:{' '}
        {lastChecked &&
          checkedDate &&
          `${checkedDate.toDateString()} ${checkedDate.toLocaleTimeString()}`}
      </h2>

      <SearchControl onChange={onInputChange} />

      {covidData.length < 1 && <h1>Loading...</h1>}

      {filteredList &&
        Object.keys(filteredList).map((country, i) => (
          <CountryBlock
            countryList={filteredList[country]}
            countryName={country}
            key={i}
          />
        ))}

      {filterInput && JSON.stringify(filteredList) === '{}' && (
        <h2>No Country</h2>
      )}
    </div>
  );
}

export default App;
