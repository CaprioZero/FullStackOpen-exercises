import React from 'react'
import Weather from './Weather'

const Detail = ({ country }) => {
  return (
    <>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map(language =>
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img style={{'maxWidth': '350px', 'maxHeight': '200px'}} src={country.flag} alt="flag"></img>
      <Weather capital={country.capital} />
    </>
  )
}

export default Detail