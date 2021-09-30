import React , { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogToUpdate, user, blogToDelete }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const [removeVisible, setRemoveVisible] = useState(false)
  const hideIfNotCreator = { display: removeVisible ? 'none' : '' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
    if (blog.user.username !== user.username) {
      setRemoveVisible(true)
    }
  }

  const buttonLabel = visible ? 'Hide' : 'View'

  const updateSelectedBlog = () => blogToUpdate(blog)
  const removeSelectedBlog = () => blogToDelete(blog)

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <p>"{blog.title}" by "{blog.author}"{'\u00A0'}<button onClick={toggleVisibility}>{buttonLabel}</button></p>
      </div>
      <div style={showWhenVisible}>
        <p>Url: {blog.url}</p>
        <p>Likes: {blog.likes}{'\u00A0'}<button id='like-button' onClick={updateSelectedBlog}>Like</button></p>
        <p>Poster's name: {blog.user.name}</p>
        {/*Poster's name doesn't show up when first creating note because of state hooks doesn't rerender if pass the same value/object to it,
        as mentioned in https://github.com/facebook/react/issues/15595 so normally we need to reload page or update likes for it to show up,
        but in this project, i fix it by remove setBlogs(blogs.concat(addBlog)) in function addBlog in App.js and insert updateState check*/}
        <div style={hideIfNotCreator}><button id='delete-button' onClick={removeSelectedBlog}>Delete</button></div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogToUpdate: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  blogToDelete: PropTypes.func.isRequired
}

export default Blog