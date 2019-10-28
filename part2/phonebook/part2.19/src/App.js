import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import services from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('') 
  const [ message, setMessage ] = useState('')

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
    <Persons 
      key={person.name} 
      person={person} 
      removeEntry={()=> removeEntry(person.id, person.name)}
    />)
    
  const addEntry = (event) => {
    event.preventDefault()
    const duplicate = persons.find(person => person.name === newName)
    const changedEntry = {...duplicate, number: newNumber}

    const nameObject = {
      name: newName,
      number: newNumber,
     }

    return (duplicate===undefined 
      ? services.create(nameObject)
      .then(returnedName => {
        setNewName('')  
        setNewNumber('')
        setPersons(persons.concat(returnedName))
        setMessage(
          `${returnedName.name} was successfully added!`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }) 
      : (duplicate.name===newName && duplicate.number!==newNumber) 
      ? (window.confirm(`${newName} is already in the phonebook. Do you want to update the number?`)===true 
          ? (services.update(changedEntry.id, changedEntry)
            .then(returnedName => {
            setNewName('')  
            setNewNumber('')
            setPersons(persons.map(person => person.name !== newName? person : returnedName ))
            setMessage(
              `${returnedName.name}'s number was successfully changed!`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            })) 
          : setNewNumber(''), setNewName('')
          )
       : (duplicate.name===newName && duplicate.number===newNumber)
       ? alert(`${duplicate.name}'s name and number are already in the phonebook!`)
       : null)   
   }
  
  const removeEntry = (id, name) => {
    const confirmRemove = window.confirm(`Are you sure you want to delete ${name}?`)

    return(
      confirmRemove
      ? services.remove(id)
      .catch(error => {
        alert(
          `${name} was already deleted from server`
        )
        setPersons(persons.filter( p => p.id !== id))
      }) &&
      setPersons(persons.filter( p => p.id !== id))  
      : null
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
      <Notification message={message} />
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