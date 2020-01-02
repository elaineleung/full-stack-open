import React from 'react'

const Notification = ({ notification }) => {
  const condition = ( notification.message===null)
        ? null 
        : notification.type==='error'
        ? <div className='error'>{notification.message}</div>
        : <div className='success'>{notification.message}</div>
    
    return <div>{condition}</div>
}

export default Notification 