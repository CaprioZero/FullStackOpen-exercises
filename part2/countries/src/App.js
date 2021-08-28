import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  // axios.get('https://restcountries.eu/rest/v2/all').then(response => {
  //   console.log(response)
  // })     view respond data model

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('Get countries done')
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    // console.log(event.target.value)
    setNewFilter(event.target.value)
    // console.log(newFilter)
    const regex = new RegExp(newFilter, 'i');
    const filtered = () => countries.filter(country => country.name.match(regex))
    setCountries(filtered)
    //console.log(countries)
  }

  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <Countries newFilter={newFilter} countries={countries} setCountries={setCountries} />
    </div>
  )
}
export default App