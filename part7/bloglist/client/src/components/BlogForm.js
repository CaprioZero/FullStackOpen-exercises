import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ blogData }) => {
  const [newTitle, setNewTitle ] = useState('')
  const [newAuthor, setNewAuthor ] = useState('')
  const [newUrl, setNewUrl ] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    blogData({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
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
  blogData: PropTypes.func.isRequired
}

export default BlogForm