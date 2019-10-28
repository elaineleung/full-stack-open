import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ]) 
  const [ newName, setNewName ] = useState('')

  const results = () => 
    persons.map(person => <div key={person.name}>{person.name}</div>)
  
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      id: persons.length + 1,
     }

     setPersons(persons.concat(nameObject))
     setNewName('')
   }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
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