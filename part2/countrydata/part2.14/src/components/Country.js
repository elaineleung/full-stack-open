import React, { useState, useEffect } from 'react'
import Profile from './Profile'
import axios from 'axios'

const Country = (props) => {

    const [ weather, setWeather ] = useState([])
    
    useEffect(() => {
        axios
          .get(`http://api.weatherstack.com/current?access_key=193fd41ff84a64bcab19fd1613f79377&query=${props.country.capital}`)
          .then(response => {
            setWeather(response.data)
          })
      }, [props.country.capital])
    
    const countryRow = props.filtered.length===1 
      ? null
      : <p>
          {props.country.name} <button value={props.country.name} onClick={props.handleCountryClick}>Show</button>
        </p>

    const countryProfile = props.showDisplay || props.filtered.length===1 
      ? <Profile country={props.country} weather={weather} setWeather={setWeather} /> 
      : <div></div>

    return(
      <div>  
        <div>{countryRow}</div>
        <div>{countryProfile}</div>
      </div> 
     )
    }

export default Country
