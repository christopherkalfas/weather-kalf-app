import React from 'react';
import './App.css';
import apiConfig from './apiKeys'
import Card from './Card'
import Search from './Search'

const weatherURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=30008,us&units=imperial&APPID=' + apiConfig.apikey
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

  formatCards = () => {
    return this.state.dailyWeatherData.map(( reading, index) => <Card day={reading} key= {index} />)
  }

  render(){
    return(
      <div className='container'>
        <h1 className='display-1 jumbotron'>WeatherKalf</h1>
        <Search />
        <div className="list-group list-group-horizontal-xl">
          {this.formatCards()}
        </div>
      </div>
    )
  }
}

export default App;
