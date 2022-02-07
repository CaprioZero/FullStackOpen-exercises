import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useMatch } from 'react-router-dom'

const UserDetail = () => {
  const match = useMatch('/users/:id')
  const userBlog = useSelector(state => state.users.find(user => user.id === match.params.id))

  if (!userBlog) {
    return <Navigate to='/users' />
  }

  return (
    <>
      <h2>{userBlog.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {userBlog.blogs.map(blog =>
          <li key={blog.id}>
            <p>{blog.title}</p>
          </li>
        )}
      </ul>
    </>
  )
}

export default UserDetail