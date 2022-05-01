import userEvent from '@testing-library/user-event';
import React, { useEffect, useState } from 'react'
import './weather.css'
import WeatherCard from "./weatherCard"

// API key  = fee83fba091e8b4e63bd8475fb6c3c74
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

/*
https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=fee83fba091e8b4e63bd8475fb6c3c74

for metrci units -
https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid={API key}&units=metric
https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=fee83fba091e8b4e63bd8475fb6c3c74&units=metric
*/

const Weather = () => {
    const [searchValue, setSearchValue] = useState("Pune");
    const [mynewInfor, setMyNewInfor] = useState({});

    const getWeatherInfor = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=fee83fba091e8b4e63bd8475fb6c3c74&units=metric`;

            const response = await fetch(url);
            const data = await response.json();
            // console.log(data);

            const { temp, humidity, pressure } = data.main
            const { main: weatherMood } = data.weather[0];
            const { name: city } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            const myNewWeatherInfromation = {
                temp,
                humidity,
                pressure,
                weatherMood,
                city,
                speed,
                country,
                sunset,
            };
            setMyNewInfor(myNewWeatherInfromation);
            // console.log(mynewInfor);
        } catch (error) {
            alert("Please Enter Valid city Name");
            setSearchValue("Pune");

        }
    }
    /*Converting seconds into millisecond and then to time */
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let sec = mynewInfor.sunset;
    let longdate = new Date(sec * 1000);
    let day = weekday[longdate.getDay()];
    let month = months[longdate.getMonth()];
    let date = longdate.getDate();
    let timestring = `${longdate.getHours()}:${longdate.getMinutes()}`;
    console.log(timestring) ;
    let suffix = longdate.getHours() >= 12 ? "PM":"AM";
    /* 1. We want to shaow weather of pune by default when web starts. No need to click search button clicked
hence use useEffect hook */
    useEffect(() => { getWeatherInfor() }, [])

    return (
        <div>
            {/* <WeatherCard information={...mynewInfor} /> */}

            <div className="container-fluid px-1 px-md-4 py-5 mx-auto">
                <div className="row d-flex justify-content-center px-3">

                    <input className="form-control" type="text" placeholder="Enter City here" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                    <span className="button" onClick={() => getWeatherInfor()}>Search</span>
                    <div className="card">
                        <h2 className="ml-auto mr-4 mt-3 mb-0">{mynewInfor.city}({mynewInfor.country})</h2>
                        <p className="ml-auto mr-4 mb-0 med-font">{mynewInfor.weatherMood}</p>
                        <p className="ml-auto mr-4 mb-0 small-font">Humidity : {mynewInfor.humidity}</p>
                        <p className="ml-auto mr-4 mb-0 small-font">Pressure : {mynewInfor.pressure}</p>
                        <h1 className="ml-auto mr-4 large-font">{mynewInfor.temp}&#176;</h1>
                        {/* <p className="ml-auto mr-4 mb-0 small-font">Speed : {mynewInfor.speed}</p> */}
                        <p className="time-font mb-0 ml-4 mt-auto">{timestring}<span className="med-font">    {suffix}</span></p>
                        <p className="ml-4 mb-4 med-small">{date} {month} , {day} </p>
                        <span><pre className="ml-9 mb-20" style={{ "color": "brown" }}> **All information is in Metric Unit </pre></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather
