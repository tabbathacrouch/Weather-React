import React, { useState } from "react";
import moment from "moment";

const FtoC = (f) => {
  const c = ((f - 32) * 5) / 9;
  return c;
};

function App() {
  const [query1, setQuery1] = useState("");
  const [query2, setQuery2] = useState("");
  const [weatherCity1, setWeatherCity1] = useState({});
  const [weatherCity2, setWeatherCity2] = useState({});

  const handleSearchCity1 = (event) => {
    if (event.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query1}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`
      )
        .then((response) => response.json())
        .then((result) => {
          setWeatherCity1(result);
          setQuery1("");
          console.log(result);
        });
    }
  };

  const handleSearchCity2 = (event) => {
    if (event.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query2}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`
      )
        .then((response) => response.json())
        .then((result) => {
          setWeatherCity2(result);
          setQuery2("");
          console.log(result);
        });
    }
  };

  return (
    <div className="container">
      <div className="date-time">{moment().format("MMMM Do YYYY, h:mm a")}</div>
      <div className="title">Compare the current weather of two cities.</div>

      <div className="main">
        <div className="city1">
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={(event) => setQuery1(event.target.value)}
              value={query1}
              onKeyPress={handleSearchCity1}
            />
          </div>

          {typeof weatherCity1.main != "undefined" ? (
            <>
              <div
                className={
                  typeof weatherCity1.main === "undefined"
                    ? "left"
                    : `left ${weatherCity1.weather[0].main}`
                }
              >
                <div className="location-box">
                  <div className="location">
                    {weatherCity1.name}, {weatherCity1.sys.country}
                  </div>
                </div>
                <div className="weather-box">
                  <div className="temp">
                    {Math.round(weatherCity1.main.temp)}°F
                    <br />
                    {Math.round(FtoC(weatherCity1.main.temp))}°C
                  </div>
                  <div className="weather">{weatherCity1.weather[0].main}</div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="city2">
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={(event) => setQuery2(event.target.value)}
              value={query2}
              onKeyPress={handleSearchCity2}
            />
          </div>
          {typeof weatherCity2.main != "undefined" ? (
            <div
              className={
                typeof weatherCity2.main === "undefined"
                  ? "right"
                  : `right ${weatherCity2.weather[0].main}`
              }
            >
              <div className="location-box">
                <div className="location">
                  {weatherCity2.name}, {weatherCity2.sys.country}
                </div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(weatherCity2.main.temp)}°F
                  <br />
                  {Math.round(FtoC(weatherCity2.main.temp))}°C
                </div>
                <div className="weather">{weatherCity2.weather[0].main}</div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
