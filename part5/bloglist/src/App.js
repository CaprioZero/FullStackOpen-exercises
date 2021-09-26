import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [updateState, setUpdateState] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
      setErrorMessage(
        `Wrong username or password`
      )
      setMessage(null)
      setTimeout(() => {
        setMessage(null)
        setErrorMessage(null)
      }, 3000)
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
      setMessage(
        `A new blog "${blogData.title}" by "${blogData.author}" added`
      )
      setErrorMessage(null)
      setTimeout(() => {
        setMessage(null)
        setErrorMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage(
        `Something went wrong, can't add "${blogData.title}"`
      )
      setMessage(null)
      setTimeout(() => {
        setMessage(null)
        setErrorMessage(null)
      }, 3000)
    }
  }

  const deleteBlog = async (blogData) => {
    try {
      if (window.confirm(`Remove blog "${blogData.title}" by "${blogData.author}"?`)) {
        const userToken = user.token
        setUpdateState(await blogService
          .remove(blogData.id, userToken))
        setMessage(
          `Blog "${blogData.title}" delete successfully`
        )
        setErrorMessage(null)
        setTimeout(() => {
          setMessage(null)
          setErrorMessage(null)
        }, 3000)
      }
    } catch (exception) {
      if (exception.response.status === Number('401')) {
        setErrorMessage(
          `Something went wrong, can't delete "${blogData.title}", maybe you're not the creator of it`
        )
        setMessage(null)
        setTimeout(() => {
          setMessage(null)
          setErrorMessage(null)
        }, 3000)
      } else {
        setBlogs(blogs.filter(blog => blog.id !== blogData.id))
        setErrorMessage(
          `Information of "${blogData.title}" has already been removed from server`
        )
        setMessage(null)
        setTimeout(() => {
          setMessage(null)
          setErrorMessage(null)
        }, 3000)
      }
    }
  }

  return (
    <>
      {user === null ?
      <>
        <h2>Log in to application</h2>
        <Notification message={message} errorMessage={errorMessage} />
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
        <Notification message={message} errorMessage={errorMessage} />
        <p>{user.name} logged in{'\u00A0'}<button onClick={handleLogout} type="submit">Logout</button></p>
        <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
          <BlogForm blogData={addBlog} />
        </Togglable>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
         <Blog key={blog.id} blog={blog} setUpdateState={setUpdateState} user={user} blogToDelete={deleteBlog}/>
        )}
      </>
      }
    </>
  )
}

export default App