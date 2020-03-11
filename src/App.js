import React from 'react';
import './App.css';
import apiConfig from './apiKeys'

const weatherURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=10302,us&units=imperial&APPID=' + apiConfig.apikey
class App extends React.Component {
  state = {
    fullData: [],
    dailyWeatherData: []
  }

  componentDidMount = () => {
    fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      //console.log("data load", data.list)
      const dailyWeatherData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
      this.setState({
        fullData: data.list,
        dailyWeatherData: dailyWeatherData
      }, () => console.log(this.state))
    })
  }

  // formatCards = () => {
  //   return this.state.days.map( ( day, index ) => <Card day={day} key= {index} />)
  // }

  render(){
    return(
      <div className='App'>
        WeatherKalf
      </div>
    )
  }
}

export default App;
