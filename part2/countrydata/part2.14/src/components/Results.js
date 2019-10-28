import React from 'react'
import Country from './Country'

const Results = (props) => {

    const results = () => props.filtered.map((country) =>
        <div key={country.alpha3Code}>
            <Country 
                country={country} 
                filtered={props.filtered} 
                setCountryFilter={props.setCountryFilter} 
                handleCountryClick={props.handleCountryClick} 
                showDisplay={props.showDisplay} 
                setShowDisplay={props.setShowDisplay}
            />
        </div>
        )

    const conditions = props.countryFilter === '' 
        ? <p>Type in a country name in the search bar!</p>
        : props.filtered.length === 0 ? <p>No matches!</p>
        : props.filtered.length < 10 ? <div>{results()}</div>
        : <p>Too many results! Try another filter.</p>

    return(
        <div>{conditions}</div>
        )
    }

export default Results