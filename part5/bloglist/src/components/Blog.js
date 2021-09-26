import React , { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const buttonLabel = visible ? 'Hide' : 'View'

  return (
    <div style={blogStyle}>
      <div>
        <p>"{blog.title}" by "{blog.author}"{'\u00A0'}<button onClick={toggleVisibility}>{buttonLabel}</button></p>
      </div>
      <div style={showWhenVisible}>
        <p>Url: {blog.url}</p>
        <p>Likes: {blog.likes}{'\u00A0'}<button>Like</button></p>
        <p>Poster: {blog.user.name}</p>
      </div>
    </div>
  )
}

export default Blog