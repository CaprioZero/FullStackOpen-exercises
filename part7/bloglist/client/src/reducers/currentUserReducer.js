import blogService from '../services/blogs'
import loginService from '../services/login'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'INIT_USER':
    return action.user
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return action.user
  default:
    return state
  }
}

export const initializeUser = () => {
  return async dispatch => {
    try {
      const loggedUserJSON = window.localStorage.getItem('blogUsersInformation')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        blogService.setToken(user.token)
        dispatch({
          type: 'INIT_USER',
          user: user
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'blogUsersInformation', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        user: user
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('blogUsersInformation')
    dispatch({
      type: 'LOGOUT',
      user: null
    })
  }
}

export default userReducer