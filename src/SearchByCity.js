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
                console.log(data.weather[0].id)
                console.log(data.weather)
            })
        }
    }
    

    const dateNow = (dmy) => {
        let months = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let daysOfTheWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]

        let day = daysOfTheWeek[ dmy.getDay() ]
        let month = months[ dmy.getMonth() ]
        let year = dmy.getFullYear()
        let date = dmy.getDate()

        return `${day}, ${month}-${date}, ${year}`
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
                    <div className='search-results'>
                    <div className='card-title'>
                    <strong>{weather.name}, {weather.sys.country}</strong>
                    <div className="date">
                        {dateNow( new Date())}
                    </div>
                    <i className={"owf owf-"+ weather.weather["0"].id +" owf-5x red"}></i>
                </div>
                <div className="text-muted">

                {Math.round(weather.main.temp)}°F
                <br/>
                Temp Range: {Math.round(weather.main.temp_min)} - {Math.round(weather.main.temp_max)}
                </div>
                <div className = 'card-text'>
                    {weather.weather[0].main}
                </div>
                    </div>
                ) : ('')}
                
            </div>
        </div>
    )
}

export default SearchByCity