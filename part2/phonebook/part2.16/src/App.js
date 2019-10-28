import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import services from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('') 

  useEffect(() => {
    services
      .get()
      .then(initialNames => {
        setPersons(initialNames)
      })
  }, [])

  const filtered = persons.filter(
    person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  const results = () => filtered.map(person =>
    <Persons key={person.name} person={person} />)
      
  const addEntry = (event) => {
    event.preventDefault()
    const duplicate = persons.find(person => person.name === newName)
    
    const nameObject = {
      name: newName,
      number: newNumber,
     }

    return (duplicate===undefined 
      ? services.create(nameObject)
      .then(returnedName => {
        setNewName('')  
        setNewNumber('')
        setPersons(persons.concat(returnedName))}) 
      : alert(`${newName} is already added to the phonebook!`)
      )  
   }
  
  const handleNameChange = (event) => 
    setNewName(event.target.value)

  const handleNumberChange = (event) => 
    setNewNumber(event.target.value)

  const handleFilterChange = (event) => 
    setNameFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        nameFilter={nameFilter} 
        handleFilterChange={handleFilterChange} 
        />
      <h3>Add a new entry</h3>
      <PersonForm 
        addEntry={addEntry} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        />
      <h3>Numbers</h3>
      <div>{results()}</div>
    </div> 
  )
}

export default App