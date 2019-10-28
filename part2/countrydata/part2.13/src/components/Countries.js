import React from 'react'
import Country from './Country'

const Countries = (props) => {

    return(
    <div>
        {props.filtered.map((country) =>
        <div key={country.alpha3Code}>
            <div> 
                {props.filtered.length===1? <div></div> : 
                <div>{country.name} <button value={country.name} onClick={props.handleCountryClick}>
                {props.showDisplay ? 'Hide' : 'Show'}</button>
                </div>}
            </div>
            <div> {props.showDisplay ? <Country key={country.name} country={country} /> : <div></div>}</div>
        </div>
        )}
    </div>
    )
    }

export default Countries

