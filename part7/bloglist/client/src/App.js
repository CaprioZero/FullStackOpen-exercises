import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UsersList from './components/UsersList'
import UserDetail from './components/UserDetail'
import BlogsList from './components/BlogsList'
import BlogDetail from './components/BlogDetail'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logout } from './reducers/currentUserReducer'
import { initializeAllUsers } from './reducers/usersReducer'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  const currentUser = useSelector(state => state.currentUser)

  const dispatch = useDispatch()

  {/*Because react usestate doesn't update state immediately due to it being async action so need to use useEffect to update each time value change*/}
  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
    dispatch(initializeAllUsers())
  }, [dispatch])

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
          <Notification />
          <p>{currentUser.name} logged in{'\u00A0'}<button id='logout-button' onClick={handleLogout} type="submit">Logout</button></p>
          <Routes>
            <Route path="/" element={<BlogsList />} />

            <Route path="blogs" element={<BlogsList />} />
            <Route path="blogs/:id" element={<BlogDetail />} />

            <Route path="users" element={<UsersList />} />
            <Route path="users/:id" element={<UserDetail />} />

          </Routes>
        </>
      }
    </>
  )
}

export default App