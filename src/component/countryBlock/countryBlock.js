import React, { useState, useEffect } from 'react';

import './countryBlock.scss';

function CountryBlock({ countryName, countryList }) {
  const [confirmed, setConfirmed] = useState(0);
  const [recovered, setRecovered] = useState(0);
  const [deaths, setDeaths] = useState(0);

  console.log(countryList);

  useEffect(() => {
    let recovered = 0;
    let confirmed = 0;
    let deaths = 0;
    countryList.map(country => {
      confirmed += country.confirmed;
      deaths += country.deaths;
      recovered += country.recovered;
    });
    setConfirmed(confirmed);
    setRecovered(recovered);
    setDeaths(deaths);
  }, [countryList]);

  return (
    <div className="country__block">
      <h2>{countryName}</h2>
      <div className="numbers">
        <div className="confirmed">
          <div className="heading">
            <p>Confirmed</p>
          </div>
          <div className="count">
            <span>{confirmed}</span>
          </div>
        </div>

        <div className="recovered">
          <div className="heading">
            <p>Recovered</p>
          </div>
          <div className="count">
            <span>{recovered}</span>
          </div>
        </div>

        <div className="deaths">
          <div className="heading">
            <p>Deaths</p>
          </div>
          <div className="count">
            <span>{deaths}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

CountryBlock.propTypes = {};

export default CountryBlock;
