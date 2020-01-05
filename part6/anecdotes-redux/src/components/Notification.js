import React from 'react'
import { connect } from 'react-redux'
// import notificationReducer from '../reducers/notificationReducer'

const Notification = (props) => {
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (props.notification === '') {
    return null
  }

  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)