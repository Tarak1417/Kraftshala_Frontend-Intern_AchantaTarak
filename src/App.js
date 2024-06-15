import React, { Component } from "react";
import axios from "axios";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      location: '',
      time: new Date(),
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  searchLocation = (event) => {
    const { location } = this.state;
    const apiKey = 'c8db4b36cb6cf4607912ea8a55e316c7';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`;

    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        this.setState({ data: response.data });
        console.log(response.data);
      }).catch((error) => {
        console.error("Error fetching the weather data", error);
      });
      this.setState({ location: '' });
    }
  };

  handleLocationChange = (event) => {
    this.setState({ location: event.target.value });
  };

  getDate = () => {
    const { time } = this.state;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return time.toLocaleDateString(undefined, options);
  };

  getTime = () => {
    const { time } = this.state;
    return time.toLocaleTimeString();
  };

  render() {
    const { data, location } = this.state;

    return (
      <div className="App">
        <div className="search">
          <input
            value={location}
            type="text"
            onChange={this.handleLocationChange}
            placeholder="Enter a location"
            onKeyPress={this.searchLocation}
          />
        </div>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="datetime">
              <p>{this.getDate()}</p>
              <p>{this.getTime()}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].description}</p> : null}
            </div>
          </div>
          {data.name !== undefined &&
            <div className="bottom">
              <div className="feel">
                {data.main ? <p>{data.main.feels_like.toFixed()}°F</p> : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? <p>{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? <p className="bold">{data.wind.speed.toFixed()} mph</p> : null}
                <p className="bold">Wind Speed</p>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
