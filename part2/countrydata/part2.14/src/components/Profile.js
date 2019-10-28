import React from 'react'

const Profile = ( { country, weather } ) => {
 
    return(
        <div>
            <h2>{country.name}</h2>
            <div><strong>Capital:</strong> {country.capital}</div>
            <div><strong>Population:</strong> {country.population.toLocaleString('en')}</div>
            <h3>Languages</h3>
                <ul>{country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}</ul> 
            <div><img src={country.flag} alt="" width="200px" /></div>
            <h3>Weather in {country.capital}</h3>
            <p><strong>Temperature:</strong> {weather.current.temperature} Celsius</p>
            <div><img src={weather.current.weather_icons} alt="" /></div>
            <p><strong>Wind speed:</strong> {weather.current.wind_speed} kph direction {weather.current.wind_dir}</p>
        </div>
    )
    }

export default Profile

