const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }

const favoriteBlog = (blogs) => {
    const maxLikes = Math.max(...blogs.map(blog => blog.likes), 0)
    return blogs.length === 0
    ? {}
    : {
        title: blogs.find(blog => blog.likes === maxLikes).title,
        author: blogs.find(blog => blog.likes === maxLikes).author,
        likes: maxLikes
    }
  }
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }