import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Results from './components/Results'


const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ countryFilter, setCountryFilter ] = useState('') 
  const [ showDisplay, setShowDisplay ] = useState(false)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [setCountries])

  const filtered = countries.filter(
    country => country.name.toLowerCase().includes(countryFilter.toLowerCase()))
 
  const handleSearchChange = (event) => {
    setCountryFilter(event.target.value)
    setShowDisplay(false)
  }  

   const handleCountryClick = (event) => {
    setCountryFilter(event.target.value)
    setShowDisplay(!showDisplay)
  }

  return (
    <div>
      <div>
        <h1>Countries</h1>
      </div>
      <div>
        Find countries: <input type="search" value={countryFilter} onChange={handleSearchChange} />          
      </div>
      <div>
        <Results 
          filtered={filtered} 
          setCountryFilter={setCountryFilter} 
          countryFilter={countryFilter} 
          handleCountryClick={handleCountryClick} 
          showDisplay={showDisplay}
          setShowDisplay={setShowDisplay}
        />
      </div>
    </div> 
  )
}

export default App