import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useMatch } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { Helmet } from 'react-helmet'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { updateLikes, deleteBlog, addComment } from '../reducers/blogReducer'
import { useField } from '../hooks/useField'

const Blog = () => {
  const match = useMatch('/blogs/:id')
  const currentBlog = useSelector(state => state.blogs.find(blog => blog.id === match.params.id))
  const currentUser = useSelector(state => state.currentUser)
  const commentContent = useField('text')
  const dispatch = useDispatch()

  if (!currentBlog) {
    return <Navigate to='/' />
  }

  const dispayDelete = currentBlog.user.username === currentUser.username

  const like = () => {
    dispatch(updateLikes(currentBlog, currentUser.token))
  }

  const deleteFunc = () => {
    if (window.confirm(`Remove blog "${currentBlog.title}" by "${currentBlog.author}"?`)) {
      dispatch(deleteBlog(currentBlog.id, currentUser.token))
    }

  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleAddComment(commentContent.value)
    commentContent.clear()
  }

  const handleAddComment = (commentContent) => {
    dispatch(addComment(currentBlog, commentContent))
  }

  // fix 7.6 bug: get props of commentContent, get rid of prop named 'clear' and put the rest in commentExcludeClear
  // eslint-disable-next-line no-unused-vars
  const { clear, ...commentExcludeClear } = commentContent

  return (
    <>
      <Helmet>
        <title>{currentBlog.title}</title>
      </Helmet>
      <Typography variant="h4" gutterBottom component="div">
        "{currentBlog.title}" by "{currentBlog.author}"
      </Typography>
      <div>
        <Typography variant="body1" gutterBottom component="div">
          Url: {currentBlog.url}
        </Typography>
        <Typography variant="body1" gutterBottom component="div">
          Likes: {currentBlog.likes}{'\u00A0'}<button id='like-button' onClick={like}>Like</button>
        </Typography>
        <Typography variant="body1" gutterBottom component="div">
          Poster's name: {currentBlog.user.name}
        </Typography>
        {dispayDelete && <div><Button variant="contained" color="error" id='delete-button' onClick={deleteFunc}>Delete</Button></div>}
      </div>

      <br />
      <Typography variant="h5" gutterBottom component="div">
        Comments
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField {...commentExcludeClear} />
        <Button variant="contained" type='submit'>Add comment</Button>
      </form>
      <br />
      {currentBlog.comments.map((comment) =>
        <Typography key={nanoid()} variant="body1" gutterBottom component="div">► {comment}</Typography>
      )}
    </>
  )
}

export default Blog