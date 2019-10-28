import React from 'react'

const Notification = ({ message }) => {
    if ( message===null || message==='' ) {
      return null
    }
    return(
      <div className="message">
        {message}
      </div>
    )
  }

export default Notification