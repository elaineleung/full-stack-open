import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const results = () => 
    persons.map(person => <div key={person.name}>{person.name}</div>)

  const addName = (event) => {
    event.preventDefault()
    const duplicate = persons.find(person => person.name === newName)
    
    const nameObject = {
      name: newName,
      id: persons.length + 1,
     }

     if (duplicate===undefined) {
      setPersons(persons.concat(nameObject))
      setNewName('')   
     }
     else {
     alert(`${newName} is already added to the phonebook!`)}  
   }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          Name: <input 
          value={newName}
          onChange={handleNameChange}
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