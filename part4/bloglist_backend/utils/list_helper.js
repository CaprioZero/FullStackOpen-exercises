const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
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

const mostBlogs = (blogs) => {
    const authorsCount = _(blogs)
        .countBy('author')
        .map(function(blogs, author) { return { 'author': author, 'blogs': blogs }})
        .value()
    return blogs.length === 0 ? {} : _.maxBy(authorsCount,'blogs')
}

const mostLikes = (blogs) => {
    const likesCount = _(blogs)
        .groupBy('author')
        .map(function(likes, author) { return { 'author': author, 'likes': _.sumBy(likes, 'likes') }})
        .value()
    return blogs.length === 0 ? {} : _.maxBy(likesCount,'likes')
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}