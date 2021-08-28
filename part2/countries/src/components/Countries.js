import React from 'react'
import Detail from './Detail'

const Countries = ({ newFilter, countries }) => {
  if (newFilter === '') {
    return (
      <p>Type in search box, remember that after typing the second char then the first one get search, 3rd char for the 2nd to be searched and subsequently.
        <br />After searching, please refresh so we can get full list of countries again</p>
    )
  }
  else if (countries.length >= 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (countries.length >= 2 && countries.length < 10) {
    return (
      <ul>
        {countries.map(country =>
          <li key={country.name}> {country.name}</li>
        )}
      </ul>
    )
  } else if (countries.length === 0) {
    return (
      <p>No country found</p>
    )
  } else {
    return (
      <Detail country={countries[0]} />
    )
  }
}

export default Countries