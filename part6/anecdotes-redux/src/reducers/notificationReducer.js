const notificationReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.content
    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    data: { content: message }
  }
}

export const removeNotification = (message) => {
  return {
    type: 'REMOVE_NOTIFICATION',
    data: { content: message }
  } 
}
  // return async (dispatch) => {
  //   dispatch({
  //     type: 'SET_NOTIFICATION',
  //     data: {
  //       content: message
  //     }
  //   })
  //   setTimeout(() => {
  //     dispatch({
  //       type: 'DELETE_NOTIFICATION',
  //       data: {
  //         content: ''
  //       }  
  //     })
  //   }, 5000)
  // }  

export default notificationReducer