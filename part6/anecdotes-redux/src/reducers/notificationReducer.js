const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.content
    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { content: message }
    })
    setTimeout(() => dispatch({
      type: 'REMOVE_NOTIFICATION',
      data: { content: message }
    }), time * 1000
    )
  }
}

export default notificationReducer