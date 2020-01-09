import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  if (props.notification === '') {
    return null
  }

  return (
    <div className='spacing'>
      <div className="ui message large">
        {props.notification}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)

//   const condition = ( notification.message===null)
//     ? null
//     : notification.type==='error'
//       ? <div className='error'>{notification.message}</div>
//       : <div className='success'>{notification.message}</div>

//   return <div>{condition}</div>
// }
// const style = {
//   border: 'solid',
//   padding: 10,
//   borderWidth: 1
// }
