import blogService from '../services/blogs'

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
        data: newBlog,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs,
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
        data: updatedBlog,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteBlog = (id, receivedToken) => {
  return async dispatch => {
    try {
      const deletedBlog = await blogService.remove(id, receivedToken)
      dispatch({
        type: 'DELETE_BLOG',
        data: deletedBlog,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default blogReducer