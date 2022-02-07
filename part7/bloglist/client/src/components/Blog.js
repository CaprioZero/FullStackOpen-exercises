import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { updateLikes, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ singleBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const [removeVisible, setRemoveVisible] = useState(false)
  const hideIfNotCreator = { display: removeVisible ? 'none' : '' }

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
    if (singleBlog.user.username !== user.username) {
      setRemoveVisible(true)
    }
  }

  const buttonLabel = visible ? 'Hide' : 'View'

  const like = () => {
    try {
      dispatch(updateLikes(singleBlog, user.token))
    } catch (exception) {
      dispatch(setNotification(`Information of "${singleBlog.title}" has already been removed from server`, 'error', 3))
    }
  }

  const deleteFunc = () => {
    try {
      if (window.confirm(`Remove blog "${singleBlog.title}" by "${singleBlog.author}"?`)) {
        dispatch(deleteBlog(singleBlog.id, user.token))
        dispatch(setNotification(`Blog "${singleBlog.title}" delete successfully`, 'success', 3))
      }
    } catch (exception) {
      if (exception.response.status === Number('401')) {
        dispatch(setNotification(`Something went wrong, can't delete "${singleBlog.title}", maybe you're not the creator of it`, 'error', 3))
      } else {
        dispatch(setNotification(`Information of "${singleBlog.title}" has already been removed from server`, 'error', 3))
      }
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <p>"{singleBlog.title}" by "{singleBlog.author}"{'\u00A0'}<button onClick={toggleVisibility}>{buttonLabel}</button></p>
      </div>
      <div style={showWhenVisible}>
        <p>Url: {singleBlog.url}</p>
        <p>Likes: {singleBlog.likes}{'\u00A0'}<button id='like-button' onClick={like}>Like</button></p>
        <p>Poster's name: {singleBlog.user.name}</p>
        <div style={hideIfNotCreator}><button id='delete-button' onClick={deleteFunc}>Delete</button></div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  singleBlog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog