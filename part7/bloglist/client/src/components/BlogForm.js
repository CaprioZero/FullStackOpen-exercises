import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { createBlog } from '../reducers/blogReducer'

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
    dispatch(createBlog(blogData, token))
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
          <TextField label="Input title" id='title' value={newTitle} onChange={handleTitleChange} />
        </div>
        <div>
          <TextField label="Input author" id='author' value={newAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
          <TextField label="Input url" id='url' value={newUrl} onChange={handleUrlChange} />
        </div>
        <div>
          <Button variant='outlined' color='success' id='blog-submit' type='submit'>Create</Button>
        </div>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  token: PropTypes.string.isRequired
}

export default BlogForm