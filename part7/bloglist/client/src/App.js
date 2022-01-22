import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [updateState, setUpdateState] = useState(null)

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [updateState])

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

  const addBlog = async (blogData) => {
    try {
      blogFormRef.current.toggleVisibility()
      const userToken = user.token
      setUpdateState(await blogService
        .create(blogData, userToken))
      dispatch(setNotification(`A new blog "${blogData.title}" by "${blogData.author}" added`, 'success', 3))
    } catch (exception) {
      dispatch(setNotification(`Something went wrong, can't add "${blogData.title}"`, 'error', 3))
    }
  }

  const updateLikes = async (blogData) => {
    try {
      const newLikes = blogData.likes + 1
      const updatedBlog = { ...blogData, likes: newLikes }
      const userToken = user.token
      setUpdateState(await blogService.update(blogData.id, updatedBlog, userToken))
    } catch (exception) {
      setBlogs(blogs.filter(blog => blog.id !== blogData.id))
      dispatch(setNotification(`Information of "${blogData.title}" has already been removed from server`, 'error', 3))
    }
  }

  const deleteBlog = async (blogData) => {
    try {
      if (window.confirm(`Remove blog "${blogData.title}" by "${blogData.author}"?`)) {
        const userToken = user.token
        setUpdateState(await blogService
          .remove(blogData.id, userToken))
        dispatch(setNotification(`Blog "${blogData.title}" delete successfully`, 'success', 3))
      }
    } catch (exception) {
      if (exception.response.status === Number('401')) {
        dispatch(setNotification(`Something went wrong, can't delete "${blogData.title}", maybe you're not the creator of it`, 'error', 3))
      } else {
        setBlogs(blogs.filter(blog => blog.id !== blogData.id))
        dispatch(setNotification(`Information of "${blogData.title}" has already been removed from server`, 'error', 3))
      }
    }
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
            <BlogForm blogData={addBlog} />
          </Togglable>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} blogToUpdate={updateLikes} user={user} blogToDelete={deleteBlog} />
          )}
        </>
      }
    </>
  )
}

export default App