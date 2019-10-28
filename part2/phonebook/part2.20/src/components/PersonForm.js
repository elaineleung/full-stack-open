import React from 'react'

const PersonForm = (props) => {
    return(
        <form onSubmit={props.addEntry}>
            <div>
                Full name: <input 
                value={props.newName}
                onChange={props.handleNameChange}
                />
            </div>
            <div>
                Phone number: <input 
                value={props.newNumber}
                onChange={props.handleNumberChange}
                />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default PersonForm