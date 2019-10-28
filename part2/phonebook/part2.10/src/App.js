import React, { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

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

  const filtered = persons.filter(
    person => person.name.toLowerCase().indexOf(nameFilter.toLowerCase()) !== -1)

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
      <Persons results={results} />
    </div> 
  )
}

export default App

// import React, { useState } from 'react'
// import Note from './components/Note'

// const App = (props) => {
//   const [notes, setNotes] = useState(props.notes) 
//   const [newNote, setNewNote] = useState('') 
//   const [showAll, setShowAll] = useState(true)

//   const notesToShow = showAll
//     ? notes
//     : notes.filter(note => note.important)

//   const rows = () => notesToShow.map(note =>
//     <Note
//       key={note.id}
//       note={note}
//     />
//   )
  
//   const handleNoteChange = (event) => {
//     console.log(event.target.value)
//     setNewNote(event.target.value)
//   }

//   const addNote = (event) => {
//     event.preventDefault()
//     const noteObject = {
//       content: newNote,
//       date: new Date().toISOString(),
//       important: Math.random() > 0.5,
//       id: notes.length + 1,
//     }

//     setNotes(notes.concat(noteObject))
//     setNewNote('')
//   }

//   return (
//     <div>
//       <h1>Notes</h1>
//       <div>
//         <button onClick={() => setShowAll(!showAll)}>
//           show {showAll ? 'important' : 'all'}
//         </button>
//       </div>
//       <ul>
//         {rows()}
//       </ul>
//       <form onSubmit={addNote}>
//         <input
//           value={newNote} 
//           onChange={handleNoteChange}
//         />
//         <button type="submit">save</button>
//       </form>
//     </div>
//   )
// }

// export default App 