import userService from '../services/users'

const usersReducer = (state = null, action) => {
  switch (action.type) {
  case 'LIST_ALL_USERS':
    return action.data
  default:
    return state
  }
}

export const initializeAllUsers = () => {
  return async dispatch => {
    try {
      const users = await userService.getAll()
      dispatch({
        type: 'LIST_ALL_USERS',
        data: users
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default usersReducer