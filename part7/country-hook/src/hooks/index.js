import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    async function getCountry() {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        const countryInfo = {
          data: response.data[0],
          found: true
        }
        setCountry(countryInfo)
      } catch (error) {
        const countryInfo = {
          found: false
        }
        setCountry(countryInfo)
      }
    }

    if (name) {
      getCountry()
    }

  }, [name])

  return country
}