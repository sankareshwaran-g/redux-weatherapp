import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeatherData } from '../slices/weatherSlice';

const Weather = () => {
  const dispatch = useDispatch();
  const { forecasts, city } = useSelector((state) => state.weather);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      dispatch(fetchWeatherData(searchQuery));
    }
  };

  return (
    <>
      <div className="weatherapp">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 mt-4">
              <div className="card bg-img">
                <div className="card-body mx-auto">
                  <h1 className="card-title">Weather Forecast</h1>
                  <form onSubmit={handleSearch}>
                    <input
                      className="form-control text-center"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Enter city name"
                      required
                    />
                    <button className="btn btn-danger mt-3" type="submit">
                      Search
                    </button>
                  </form>
                  {city && <h3 className="mt-4">{city}</h3>}
                </div>
              </div>
            </div>
          </div>
          {forecasts.length > 0 && (
            <div className="row mt-4">
              {forecasts.map((forecast) => (
                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 " key={forecast.date}>
                  <div className="card bg-transparent">
                    <h3> {forecast.date}</h3>
                    <img
                      src={forecast.day.condition.icon}
                      className="card-img-top"
                      alt="Weather Icon"
                    />
                    <div className="card-body">
                      <ul className="list-group list-group-flush">
                        {/* <li className="list-group-item bg-transparent">
                          <span className="fw-bold">Date:</span> {forecast.date}
                        </li> */}
                        <li className="list-group-item bg-transparent">
                          <span className="fw-bold">Temperature:</span> {forecast.day.avgtemp_c}°C
                        </li>
                        <li className="list-group-item bg-transparent">
                          <span className="fw-bold">Humidity:</span> {forecast.day.avghumidity}%
                        </li>
                        <li className="list-group-item bg-transparent">
                          <span className="fw-bold">Visibility:</span> {forecast.day.avgvis_km} km
                        </li>
                        <li className="list-group-item bg-transparent">
                          <span className="fw-bold">Wind Speed:</span> {forecast.day.maxwind_kph} km/h
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {forecasts.length === 0 && searchQuery.trim() !== '' && (
            <div className="row mt-4 py-5">
              <div className="col-xl-12">
                <div className="card bg-img">
                  <div className="card-body">
                    <h3 className="text-light">No forecast available</h3>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Weather;
