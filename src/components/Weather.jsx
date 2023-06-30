import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=482631d733e179dda9da2c17d1f9ddfe
      `
      );
      console.log(response.data);
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const temperatureCelsius = weatherData?.main?.temp - 273.15;

  return (
    <div>
      <h2>Weather App</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div>
          <h3>Weather for {weatherData.name}</h3>
          <p>Temperature: {temperatureCelsius.toFixed(2)}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
