const blogsRouter = require('express').Router()
const { truncateSync } = require('fs')
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1, id: 1 })
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    comments: body.comments || [],
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1, id: 1 })

  response.status(201).json(populatedBlog.toJSON())
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blogToDelete = await Blog.findById(request.params.id)

  if (blogToDelete.user.toString() === user.id.toString()) {
    await blogToDelete.remove()
    user.blogs = user.blogs.remove(blogToDelete)
    await user.save()
    response.status(204).end()
  } else {
    response.status(401).end()
  }
})

//Mongoose v6 always uses context = 'query' so context option for queries has been removed
blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  const blogToUpdate = await Blog.findById(request.params.id)

  if (blogToUpdate.user.toString() === user.id.toString()) {
    const blog = {
      title: body.title,
      url: body.url,
      likes: body.likes || 0
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true }).populate('user', { username: 1, name: 1, id: 1 })
    response.json(updatedBlog.toJSON())
  } else if (blogToUpdate.user.toString() !== user.id.toString()) {
    const blog = {
      likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true }).populate('user', { username: 1, name: 1, id: 1 })
    response.json(updatedBlog.toJSON())
  } else {
    response.status(401).end()
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body

  const blog = {
    comments: body.comments
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1, id: 1 })
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter