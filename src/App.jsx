import React, {Component, useState} from 'react';

import './App.css';

const api = {
    key : '2f582f6dc33d10e25717fad99b5b9394',
    base : 'https://api.openweathermap.org/data/2.5/'
};

function App() {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = evt => {
        if (evt.key === 'Enter'){
            fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                }).catch(err => {
                    console.log('Error: ', err)
            });
        }
    };


    const currentDate = (val) =>{

        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'];

        let day = days[val.getDay()];
        let date = val.getDate();
        let month = months[val.getMonth()];
        let year = val.getFullYear();

        return `${day} ${date} ${month} ${year}`
    };

    return (
        <div className='app '>
            <div className="search">
                <input
                    type="text"
                    className='search-bar'
                    placeholder='Search a city..'
                    onChange={e => setQuery(e.target.value)}
                    value={query}
                    onKeyPress={search}
                />
            </div>
            {(typeof weather.main !== 'undefined') ? (<div>
                <div className="region">
                    <div className="place">
                        {weather.name}, {weather.sys.country}
                    </div>
                    <div className="date">
                        {currentDate(new Date())}
                    </div>
                </div>
                <div className="weather-info">
                    <div className="temp">
                        {Math.round(weather.main.temp)}&deg;C
                    </div>
                    <div className="weather">
                        {weather.weather[0].main}
                    </div>
                </div>
            </div>) : ('')}

        </div>
    );
}

export default App;