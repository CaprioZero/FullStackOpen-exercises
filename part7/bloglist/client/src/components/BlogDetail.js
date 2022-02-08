import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useMatch } from 'react-router-dom'
import { updateLikes, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { nanoid } from 'nanoid'

const Blog = () => {
  const match = useMatch('/blogs/:id')
  const currentBlog = useSelector(state => state.blogs.find(blog => blog.id === match.params.id))
  const currentUser = useSelector(state => state.currentUser)

  const dispatch = useDispatch()

  if (!currentBlog) {
    return <Navigate to='/' />
  }

  const dispayDelete = currentBlog.user.username === currentUser.username

  const like = () => {
    try {
      dispatch(updateLikes(currentBlog, currentUser.token))
    } catch (exception) {
      dispatch(setNotification(`Information of "${currentBlog.title}" has already been removed from server`, 'error', 3))
    }
  }

  const deleteFunc = () => {
    try {
      if (window.confirm(`Remove blog "${currentBlog.title}" by "${currentBlog.author}"?`)) {
        dispatch(deleteBlog(currentBlog.id, currentUser.token))
        dispatch(setNotification(`Blog "${currentBlog.title}" delete successfully`, 'success', 3))
      }
    } catch (exception) {
      if (exception.response.status === Number('401')) {
        dispatch(setNotification(`Something went wrong, can't delete "${currentBlog.title}", maybe you're not the creator of it`, 'error', 3))
      } else {
        dispatch(setNotification(`Information of "${currentBlog.title}" has already been removed from server`, 'error', 3))
      }
    }
  }

  return (
    <>
      <h2>"{currentBlog.title}" by "{currentBlog.author}"</h2>
      <div>
        <p>Url: {currentBlog.url}</p>
        <p>Likes: {currentBlog.likes}{'\u00A0'}<button id='like-button' onClick={like}>Like</button></p>
        <p>Poster's name: {currentBlog.user.name}</p>
        {dispayDelete && <div><button id='delete-button' onClick={deleteFunc}>Delete</button></div>}
      </div>
      <h4>comments</h4>
      {currentBlog.comments.map((comment) =>
        <li key={nanoid()}>{comment}</li>
      )}
    </>
  )
}

export default Blog