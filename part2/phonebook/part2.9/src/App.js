import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('') 

  const filtered = persons.filter(person => 
    person.name.toLowerCase().indexOf(nameFilter.toLowerCase()) !== -1)

  const results = () => filtered.map(person =>
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

  const handleFilterChange = (event) => 
    setNameFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          Filter shown with: <input type="text" value={nameFilter} onChange={handleFilterChange} />          
        </div>
      <h3>Add a new entry</h3>
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
      <h3>Numbers</h3>
      <div>{results()}</div>
    </div> 
  )
}

export default App
