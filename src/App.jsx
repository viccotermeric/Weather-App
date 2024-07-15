import "./App.css";
import { useEffect, useState } from "react";
import search_icon from "./assets/search.png";
import rain_icon from "./assets/rain.png";
import clear_icon from "./assets/clear.png";
import cloud_icon from "./assets/cloud.png";
import drizzle_icon from "./assets/drizzle.png";
import snow_icon from "./assets/snow.png";
import wind_icon from "./assets/wind.png";
import humidity_icon from "./assets/humidity.png";

async function getWeatherdata(BASE_URL){
  let response = await fetch(BASE_URL)
  let data = await response.json()
  return data
}


function App() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});
  const [weatherIcon, setWeatherIcon] = useState(clear_icon);

  const API_KEY = "b904ba7be55d8e01a19d9a180c8af817";
  const BASE_URL =
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

  useEffect(()=>{
    getWeatherdata(BASE_URL).then((d)=>{
      setData(d)
      setWeatherIcon(getWeatherIcon(data.weather[0].main))
      console.log(data)
    })
  },[location])

  const getWeatherIcon = (weather) => {
    switch (weather.toLowerCase()) {
      case "clear":
        return clear_icon;
      case "rain":
        return rain_icon;
      case "clouds":
        return cloud_icon;
      case "drizzle":
        return drizzle_icon;
      case "snow":
        return snow_icon;
      default:
        return clear_icon;
    }
   };

  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" value={location} id="" placeholder="Search" onChange={(e)=>{
          setLocation(e.target.value)
          console.log(location)
        }}/>
        <img src={search_icon} alt="search" />
      </div>
      <div className="align">
        <img src={weatherIcon} alt="clear" className="weather-icon" />
        <div className="content">
          <p className="temperature">{data.main && data.main.temp
              ? Math.round(data.main.temp - 273.15)
              : "..."}˚C</p>
          <p className="location">{data.name}</p>
        </div>
      </div>  

      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="humidity" />
          <div>
            <p>{data.main?.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="wind" />
          <div>
            <p>{data.wind?.speed} Km/Hr</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;