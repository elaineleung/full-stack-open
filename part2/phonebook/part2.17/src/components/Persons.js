import React from 'react'

const Persons = ({person, removeEntry}) =>
  <div>{person.name} {person.number}    <button onClick={removeEntry}>Delete</button>
  </div>

export default Persons