import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { login } from '../reducers/currentUserReducer'
import { initializeBlogs } from '../reducers/blogReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
    dispatch(initializeBlogs())
    setUsername('')
    setPassword('')
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
          <TextField
            label="Username"
            variant="standard"
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={handleUsernameChange} />
        </div>
        <div>
          <TextField
            label="Password"
            variant="standard"
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={handlePasswordChange} />
        </div>
        <br />
        <div>
          <Button variant='contained' id='login-button' type='submit'>Login</Button>
        </div>
      </form>
    </>
  )
}

export default LoginForm