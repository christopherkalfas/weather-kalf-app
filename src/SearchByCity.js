import React, { useState } from 'react'
import apiConfig from './apiKeys'

const baseURL = "https://api.openweathermap.org/data/2.5/"

function SearchByCity(){
    const [ query, setQuery ] = useState('')
    const [ weather, setWeather ] = useState({})

    const search = e => {
        if(e.key === "Enter"){
            fetch(`${baseURL}weather?q=${query}&units=Imperial&APPID=${apiConfig.apikey}`)
            .then(response => response.json())
            .then(data => {
                setWeather(data)
                setQuery('')
                console.log(data)
            })
        }
    }


    return(
        <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp.Imperial > 60) ? 'app warm' : 'app') : 'app'}>
            <div className='weather-search-container'>
                <div className="search-box">
                    <input 
                        type='text'
                        className="search-bar"
                        placeholder="Search for Forecast"
                        onChange={ e => setQuery( e.target.value ) }
                        value={ query }
                        onKeyPress = { search }
                    />
                </div>
                {(typeof weather.main != "undefined") ? (
                    <div>
                    <div className='location'>
                    {weather.name} {weather.sys.country}
                </div>
                <div className="temp">
                {Math.round(weather.main.temp)}
                <br/>
                Temp Range: {Math.round(weather.main.temp_min)} - {Math.round(weather.main.temp_max)}
                </div>
                <div className = 'weather-type'>
                    {weather.weather[0].main}
                </div>
                    </div>
                ) : ('')}
                
            </div>
        </div>
    )
}

export default SearchByCity