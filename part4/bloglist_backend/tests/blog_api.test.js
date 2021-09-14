const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
}, 150000)

describe('inspect all initial blogs', () => {
  test('all blogs are returned as json', async () => {
    const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 100000)

  test('unique identifier property of the blog posts is named id and not _id', async () => {
    const response = await api.get('/api/blogs')
    // console.log(response.body)   list of blogs in initialBlogs doesn't get pass from top to bottom during beforeEach but in order of which arrive first so order is inconsistent
    expect(response.body[0].id).toBeDefined()
  }, 100000)
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain('First class tests')
  })

  test('if likes property missing from request, default to 0', async () => {
    const newBlog = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const contents = await blogsAtEnd.find(n => n.title === 'TDD harms architecture')
    expect(contents.likes).toBe(0)
  })

  test('fails with status code 400 if data is invaild', async () => {
    const newBlog = {
      author: 'Robert C. Martin',
      likes: 6
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const allTitles = blogsAtEnd.map(r => r.title)

    expect(allTitles).not.toContain(blogToDelete.title)
  })
})

describe('update a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const blogToUpdate = blogsAtEnd.find(n => n.title === newBlog.title)

    const updatedBlog = {
      ...blogToUpdate,
      title: 'Updated type wars',
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfterUpdate = await helper.blogsInDb()
    expect(blogsAfterUpdate).toHaveLength(helper.initialBlogs.length + 1)
    const updatedBlogData = blogsAfterUpdate.find(n => n.title === 'Updated type wars')
    expect(updatedBlogData.likes).toBe(3)
  })
})

afterAll(() => {
  mongoose.connection.close()
})