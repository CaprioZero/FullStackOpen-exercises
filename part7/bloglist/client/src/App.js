import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logout } from './reducers/currentUserReducer'
import { initializeAllUsers } from './reducers/usersReducer'

const App = () => {
  const currentUser = useSelector(state => state.currentUser)
  const blogs = useSelector(state => state.blogs)
  const [updateState, setUpdateState] = useState(null)

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  {/*Because react usestate doesn't update state immediately due to it being async action so need to use useEffect to update each time value change*/}
  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
    dispatch(initializeAllUsers())
  }, [dispatch, updateState])

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <>
      {currentUser === null ?
        <>
          <h2>Log in to application</h2>
          <Notification />
          <LoginForm />
        </> :
        <>
          <h2>Blogs</h2>
          <Notification />
          <p>{currentUser.name} logged in{'\u00A0'}<button id='logout-button' onClick={handleLogout} type="submit">Logout</button></p>
          <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
            <BlogForm token={currentUser.token} setUpdateState={setUpdateState} />
          </Togglable>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} singleBlog={blog} user={currentUser} setUpdateState={setUpdateState} />
          )}
          <UserList />
        </>
      }
    </>
  )
}

export default App