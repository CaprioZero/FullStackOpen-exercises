import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logout } from './reducers/userReducer'

const App = () => {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const [updateState, setUpdateState] = useState(null)

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  {/*Because react usestate doesn't update state immediately due to it being async action so need to use useEffect to update each time value change*/}
  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
  }, [dispatch, updateState])

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <>
      {user === null ?
        <>
          <h2>Log in to application</h2>
          <Notification />
          <LoginForm />
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