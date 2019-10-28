import React from 'react'
import Countries from './Countries'

const Results = (props) => {

    return(
    <div>{ props.countryFilter === '' ? <div>Type in a country name in the search bar!</div>
    : props.filtered.length === 0 ? <div>No matches!</div>
    : props.filtered.length < 10 ? <div><Countries filtered={props.filtered} setCountryFilter={props.setCountryFilter} handleCountryClick={props.handleCountryClick} showDisplay={props.showDisplay} setShowDisplay={props.setShowDisplay}/></div>
    : <div>Too many results! Try another filter.</div>
    }
    </div>
    )
}
export default Results