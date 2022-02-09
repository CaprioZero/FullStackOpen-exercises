import blogService from '../services/blogs'
import { initializeAllUsers } from './usersReducer'
import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'LIKE': {
    const id = action.data.id
    const blogToChange = state.find(n => n.id === id)
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1
    }
    return state.map(blog =>
      blog.id !== id ? blog : changedBlog
    )
  }
  case 'DELETE_BLOG':
    return state.filter(object => object.id !== action.data.id)
  case 'COMMENT': {
    const id = action.data.id
    const blogToChange = state.find(n => n.id === id)
    const changedBlog = {
      ...blogToChange,
      comments: action.data.comments
    }
    return state.map(blog =>
      blog.id !== id ? blog : changedBlog
    )
  }
  default:
    return state
  }
}

export const createBlog = (content, receivedToken) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(content, receivedToken)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog
      })
      dispatch(initializeAllUsers())
      dispatch(setNotification(`A new blog "${newBlog.title}" by "${newBlog.author}" added`, 'success', 3))
    } catch (error) {
      console.log(error)
      dispatch(setNotification(`Something went wrong, can't add "${content.title}"`, 'error', 3))
    }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateLikes = (blog, receivedToken) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 }, receivedToken)
      dispatch({
        type: 'LIKE',
        data: updatedBlog
      })
    } catch (error) {
      console.log(error)
      dispatch(setNotification(`Information of "${blog.title}" has already been removed from server`, 'error', 3))
    }
  }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.comment({ ...blog, comments: blog.comments.concat([comment]) })
      dispatch({
        type: 'COMMENT',
        data: updatedBlog
      })
      dispatch(setNotification(`Comment "${comment}" added successfully`, 'success', 3))
    } catch (error) {
      console.log(error)
      dispatch(setNotification(`Something went wrong, can't add "${comment}"`, 'error', 3))
    }
  }
}

export const deleteBlog = (id, receivedToken) => {
  return async dispatch => {
    try {
      const deletedBlog = await blogService.remove(id, receivedToken)
      dispatch({
        type: 'DELETE_BLOG',
        data: deletedBlog
      })
      dispatch(initializeBlogs())
      dispatch(initializeAllUsers())
      dispatch(setNotification('Blog delete successfully', 'success', 3))
    } catch (error) {
      console.log(error)
      if (error.response.status === Number('401')) {
        dispatch(setNotification('Something went wrong, can\'t delete the blog, maybe you\'re not the creator of it', 'error', 3))
      } else {
        dispatch(setNotification('Information of this blog has already been removed from server', 'error', 3))
      }
    }
  }
}

export default blogReducer