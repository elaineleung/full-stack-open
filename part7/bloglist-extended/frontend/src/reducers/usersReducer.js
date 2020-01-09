import usersService from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_USERS':
    return action.data
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const data = await usersService.getAll()
    dispatch({
      type: 'GET_USERS',
      data
    })
  }
}

export default usersReducer
