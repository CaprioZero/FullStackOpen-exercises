import React from 'react'

const LoginForm = ({ handleLogin, username, handleUsernameChange, password, handlePasswordChange }) => {

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          Username{'\u00A0'}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange} />
        </div>
        <div>
          Password{'\u00A0'} 
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default LoginForm