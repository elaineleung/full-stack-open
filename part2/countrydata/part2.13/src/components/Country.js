import React from 'react'

const Country = ( {country } ) => {

    return(
    <div>
      <h2>{country.name}</h2>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h3>Languages</h3>
        <ul>{country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}</ul> 
      <div><img src={country.flag} alt="" width="200px" /></div>
    </div>
    )
    }

export default Country

