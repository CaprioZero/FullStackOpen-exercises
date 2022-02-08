import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import { Link } from 'react-router-dom'

const BlogsList = () => {
  const currentUser = useSelector(state => state.currentUser)
  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))
  const blogFormRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <>
      <h2>Blogs</h2>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm token={currentUser.token} />
      </Togglable>
      {blogs.map(blog =>
        <li style={blogStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>"{blog.title}" by "{blog.author}"</Link>
        </li>
      )}
    </>
  )
}

export default BlogsList