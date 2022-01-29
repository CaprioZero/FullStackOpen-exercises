import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogs = useSelector(state => state.blogs)
  const [updateState, setUpdateState] = useState(null)

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  {/*Because react usestate doesn't update state immediately due to it being async action so need to use useEffect to update each time value change*/}
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch, updateState])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogUsersInformation')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'blogUsersInformation', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 'error', 3))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('blogUsersInformation')
    setUser(null)
  }

  return (
    <>
      {user === null ?
        <>
          <h2>Log in to application</h2>
          <Notification />
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            password={password}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
        </> :
        <>
          <h2>Blogs</h2>
          <Notification />
          <p>{user.name} logged in{'\u00A0'}<button id='logout-button' onClick={handleLogout} type="submit">Logout</button></p>
          <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
            <BlogForm token={user.token} setUpdateState={setUpdateState} />
          </Togglable>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} singleBlog={blog} user={user} setUpdateState={setUpdateState} />
          )}
        </>
      }
    </>
  )
}

export default App