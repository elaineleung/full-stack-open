import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Country = (props) =>
  props.filtered.map(country => 
    <div key={country.name}>
      <h2>{country.name}</h2>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h3>Languages</h3>
      <ul>{country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}</ul>
      <div><img src={country.flag} alt="" width="200px" /></div>
    </div>)

const Countries = (props) => {
  return( <div>{props.filtered.length === 1 ? <Country filtered={props.filtered} />
  : props.countryFilter === '' ? <div>Type in a country name in the search bar!</div>
  : props.filtered.length < 10 ? <div>{props.results()}</div>
  : props.filtered.length >= 10 ? <div>Too many results! Try another filter.</div>
  : <div>No matches!</div>
  }</div>)
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ countryFilter, setCountryFilter ] = useState('') 

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const filtered = countries.filter(
    country => country.name.toLowerCase().indexOf(countryFilter.toLowerCase()) !== -1)

  const results = () => 
    filtered.map(country =>
    <div key={country.name}>{country.name}</div>)
  
  //event handler for search bar  
  const handleFilterChange = (event) => 
    setCountryFilter(event.target.value)

  return (
    <div>
      <div>
        <h1>Countries</h1>
      </div>
      <div>
        Find countries: <input type="text" value={countryFilter} onChange={handleFilterChange} />          
      </div>
      <div>
        <Countries filtered={filtered} results={results} countryFilter={countryFilter}/>
      </div>
    </div> 
  )
}

export default App



// import React, { useState, useEffect } from 'react'
// import Filter from './components/Filter'
// import Persons from './components/Persons'
// import PersonForm from './components/PersonForm'
// import axios from 'axios'

// const App = () => {
//   const [ persons, setPersons ] = useState([])
//   const [ newName, setNewName ] = useState('')
//   const [ newNumber, setNewNumber ] = useState('')
//   const [ nameFilter, setNameFilter ] = useState('') 

//   useEffect(() => {
//     console.log('effect')
//     axios
//       .get('http://localhost:3001/persons')
//       .then(response => {
//         console.log('promise fulfilled')
//         setPersons(response.data)
//       })
//   }, [])

//   const filtered = persons.filter(
//     person => person.name.toLowerCase().indexOf(nameFilter.toLowerCase()) !== -1)

//   const results = () => filtered.map(person =>
//     <div key={person.name}>{person.name} {person.number}</div>)
  
//   const addEntry = (event) => {
//     event.preventDefault()
//     const duplicate = persons.find(person => person.name === newName)
    
//     const nameObject = {
//       name: newName,
//       number: newNumber,
//       id: persons.length + 1,
//      }

//      if (duplicate===undefined) {
//       setPersons(persons.concat(nameObject))
//       setNewName('')   
//       setNewNumber('')  
//      }
//      else {
//      alert(`${newName} is already added to the phonebook!`)}  
//    }
  
//   const handleNameChange = (event) => 
//     setNewName(event.target.value)

//   const handleNumberChange = (event) => 
//     setNewNumber(event.target.value)

//   const handleFilterChange = (event) => 
//     setNameFilter(event.target.value)

//   return (
//     <div>
//       <h2>Phonebook</h2>
//       <Filter 
//         nameFilter={nameFilter} 
//         handleFilterChange={handleFilterChange} 
//         />
//       <h3>Add a new entry</h3>
//       <PersonForm 
//         addEntry={addEntry} 
//         newName={newName} 
//         newNumber={newNumber} 
//         handleNameChange={handleNameChange}
//         handleNumberChange={handleNumberChange}
//         />
//       <h3>Numbers</h3>
//       <Persons results={results} />
//     </div> 
//   )
// }

// export default App
