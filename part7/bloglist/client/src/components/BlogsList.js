import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'

const BlogsList = () => {
  const currentUser = useSelector(state => state.currentUser)
  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))
  const blogFormRef = useRef()

  return (
    <>
      <h2>Blogs</h2>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm token={currentUser.token} />
      </Togglable>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} singleBlog={blog} user={currentUser} />
      )}
    </>
  )
}

export default BlogsList