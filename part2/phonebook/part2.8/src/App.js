import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const results = () => 
    persons.map(person =>
      <div key={person.name}>{person.name} {person.number}</div>)

  const addEntry = (event) => {
    event.preventDefault()
    const duplicate = persons.find(person => person.name === newName)
    
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
     }

     if (duplicate===undefined) {
      setPersons(persons.concat(nameObject))
      setNewName('')   
      setNewNumber('')  
     }
     else {
     alert(`${newName} is already added to the phonebook!`)}  
   }
  
  const handleNameChange = (event) => 
    setNewName(event.target.value)

  const handleNumberChange = (event) => 
    setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addEntry}>
        <div>
          Full name: <input 
          value={newName}
          onChange={handleNameChange}
        />
        </div>
        <div>
          Phone number: <input 
          value={newNumber}
          onChange={handleNumberChange}
        />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{results()}</div>
    </div>   
  )
}

export default App