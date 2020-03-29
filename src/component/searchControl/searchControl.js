import React from 'react';
import { useState } from 'react';

import './searchControl.scss';

function SearchControl({ onChange }) {
  const [value, setValue] = useState('');

  const handleChange = event => {
    const { value } = event.target;
    setValue(value);
    onChange(value);
  };
  return (
    <div className="search__control">
      <p>Search Country</p>
      <input
        type="text"
        value={value}
        onChange={event => handleChange(event)}
      />
    </div>
  );
}

SearchControl.propTypes = {};

export default SearchControl;
