import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = ({ token }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    const blogData = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    try {
      dispatch(createBlog(blogData, token))
      dispatch(setNotification(`A new blog "${blogData.title}" by "${blogData.author}" added`, 'success', 3))
    } catch (exception) {
      dispatch(setNotification(`Something went wrong, can't add "${blogData.title}"`, 'error', 3))
    }
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          Title: <input id='title' value={newTitle} onChange={handleTitleChange} />
        </div>
        <div>
          Author: <input id='author' value={newAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
          Url: <input id='url' value={newUrl} onChange={handleUrlChange} />
        </div>
        <div>
          <button id='blog-submit' type="submit">Create</button>
        </div>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  token: PropTypes.string.isRequired
}

export default BlogForm