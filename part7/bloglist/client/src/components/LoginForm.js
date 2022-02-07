import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/currentUserReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(login(username, password))
      dispatch(initializeBlogs())
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 'error', 3))
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          Username{'\u00A0'}
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange} />
        </div>
        <div>
          Password{'\u00A0'}
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange} />
        </div>
        <button id="login-button" type="submit">Login</button>
      </form>
    </>
  )
}

export default LoginForm