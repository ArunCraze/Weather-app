import React, { useState } from 'react';
import Axios from 'axios';
import './Home.css';

const API_KEY = 'efeec7faa3ef279a98a3776f84bbeea5';

function Home() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeatherData = async () => {
    try {
      const response = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('City not found');
      } else {
        setError('An error occurred. Please try again later.');
      }
      setWeatherData(null);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === '') {
      setError('Please enter a city name');
      setWeatherData(null);
    } else {
      fetchWeatherData();
    }
  };

  return (
    <div className="Home">
      <h1>Weather Forecast</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
          <p>Weather: {weatherData.weather[0].main}</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
