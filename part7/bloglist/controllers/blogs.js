const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user

    if (!body.likes) {
        body.likes = 0
    }
  
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const user = request.user
    const blogToDelete = await Blog.findById(request.params.id)

    if (blogToDelete.user.toString() === user.id.toString()) {
      await blogToDelete.remove()
      response.status(204).end()
    } else {
      response.status(401).end()
    }
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user
    const blogToUpdate = await Blog.findById(request.params.id)

    if (!body.likes) {
      body.likes = 0
    }

    if (blogToUpdate.user.toString() === user.id.toString()) {
      const blog = {
        title: body.title,
        url: body.url,
        likes: body.likes
      }

      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
      response.json(updatedBlog.toJSON())
    } else if (blogToUpdate.user.toString() !== user.id.toString()) {
      const blog = {
        likes: body.likes
      }

      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
      response.json(updatedBlog.toJSON())
    } else {
      response.status(401).end()
    }
})

module.exports = blogsRouter