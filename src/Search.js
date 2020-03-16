import React, { useState } from 'react'
import apiConfig from './apiKeys'

const baseURL = "https://api.openweathermap.org/data/2.5/"

function Search(){
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
            <div className='location'>
                {weather.name}
            </div>
        </div>
    )
}

export default Search