import React from 'react'
import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'

const UserDetail = () => {
  const match = useMatch('/users/:id')
  const userBlog = useSelector(state => state.users.find(user => user.id === match.params.id))

  //fix 7.14 bug, which is cause by redux state return to null on refresh, by using redux-persist to save state to localStorage

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