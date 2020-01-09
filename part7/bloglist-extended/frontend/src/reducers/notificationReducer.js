const notificationReducer = (state = '', action) => {

  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data.content
  case 'CLEAR_NOTIFICATION':
    return ''
  default:
    return state
  }
}

export const setNotification = (message, seconds) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { content: message }
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, seconds*1000)
  }
}

export const clearNotification = () => (
  {
    type: 'CLEAR_NOTIFICATION'
  }
)

// export const setNotification = (message) => {
//   return {
//     type: 'SET_NOTIFICATION',
//     data: { content: message }
//   }
// }

// export const removeNotification = (message) => {
//   return {
//     type: 'REMOVE_NOTIFICATION',
//     data: { content: message }
//   }
// }

export default notificationReducer