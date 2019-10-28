import React from 'react'

const Notification = ({ message, errorState }) => {
    
    const condition = message===null || message==='' 
        ? <div></div> 
        : errorState===true
        ? <div className="error">{message}</div>
        : <div className="success">{message}</div>
    
    return(<div>{condition}</div>)

  }

export default Notification