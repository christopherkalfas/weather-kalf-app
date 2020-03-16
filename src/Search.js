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
            .then(data => console.log(data))
        }
    }


    return(
        <div className="search-box">
            <input 
                type='text'
                className="search-bar"
                placeholder="Search for Forcast"
                onChange={ e => setQuery( e.target.value ) }
                value={ query }
                onKeyPress = { search }
            />



        </div>
    )
}

export default Search