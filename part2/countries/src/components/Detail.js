import React from 'react'

const Detail = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language =>
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img style={{'maxWidth': '350px', 'maxHeight': '200px'}} src={country.flag} alt="flag"></img>
    </div>
  )
}

export default Detail