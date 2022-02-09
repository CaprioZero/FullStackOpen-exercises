import React from 'react'
import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Typography from '@mui/material/Typography'

const UserDetail = () => {
  const match = useMatch('/users/:id')
  const userBlog = useSelector(state => state.users.find(user => user.id === match.params.id))

  //fix 7.14 bug, which is cause by redux state return to null on refresh, by using redux-persist to save state to localStorage

  return (
    <>
      <Helmet>
        <title>{userBlog.name}</title>
      </Helmet>
      <Typography variant="h5" gutterBottom component="div">
        {userBlog.name}
      </Typography>
      <Typography variant="h6" gutterBottom component="div">
      Added blogs
      </Typography>
      <ul>
        {userBlog.blogs.map(blog =>
          <li key={blog.id}>
            <Typography variant="body1" gutterBottom component="div">
              {blog.title}
            </Typography>
          </li>
        )}
      </ul>
    </>
  )
}

export default UserDetail