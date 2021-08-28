import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState({ current: {} })

    useEffect(() => {
        const units = 'm';
        const params = {
            access_key: process.env.REACT_APP_WEATHER_API_KEY,
            query: capital,
            units
        }

        axios.get('http://api.weatherstack.com/current', { params })
            .then(response => {
                console.log('Get weather done')
                setWeather(response.data)
            })
    }, [capital])

    if (weather === undefined) {
        return (
            <p>Unavailable data</p>
        )
    } else {
        console.log(weather)
        return (
            <>
                <h2>Weather in {capital}</h2>
                <p><b>temperature:</b> {weather.current.temperature} Celcius</p>
                <img src={weather.current.weather_icons} alt="Weather icon"></img>
                <p><b>wind:</b> {weather.current.wind_speed} kph direction {weather.current.wind_dir}</p>
            </>
        )
    }
}
export default Weather