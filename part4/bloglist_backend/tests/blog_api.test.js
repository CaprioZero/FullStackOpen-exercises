const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
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
  })

  test('check for a blog title in initial list', async () => {
    const response = await api.get('/api/blogs')

    const allTitles = response.body.map(blog => blog.title)
    expect(allTitles).toContain('React patterns')
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with status code 200 with valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const result = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
    expect(result.body).toEqual(processedBlogToView)
  })

  test('fails with status code 404 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    console.log('recently deleted blog\'s id is',validNonexistingId)

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with status code 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new blog', () => {
  let token    //jest raise error on declare const but const probably can't be use anyway 

  beforeEach(async () => {
    const newUser = {
      username: 'admin',
      password: 'admin123',
      name: 'root'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const result = await api
      .post('/api/login')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    token = {
      'Authorization': `bearer ${result.body.token}`
    }
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .set(token)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain('First class tests')
  })

  test('if likes property missing from request, default to 0', async () => {
    const newBlog = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
    }

    await api
      .post('/api/blogs')
      .set(token)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const testedBlog = await blogsAtEnd.find(blog => blog.title === 'TDD harms architecture')
    expect(testedBlog.likes).toBe(0)
  })

  test('fails with status code 400 if data is invaild', async () => {
    const newBlog = {
      author: 'Robert C. Martin',
      likes: 6
    }

    await api
      .post('/api/blogs')
      .set(token)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('fails with status code 401 if token is not set', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    expect(result.body.error).toContain('missing token')
  })
})

describe('delete a blog', () => {
  let token

  beforeEach(async () => {
    const newUser = {
      username: 'admin',
      password: 'admin123',
      name: 'root'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const result = await api
      .post('/api/login')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    token = {
      'Authorization': `bearer ${result.body.token}`
    }
  })

  test('succeeds with status code 204 if id is valid', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .set(token)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const updatedBlogsList = await helper.blogsInDb()
    const blogToDelete = await updatedBlogsList.find(blog => blog.title === 'First class tests')

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set(token)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const allTitles = blogsAtEnd.map(blog => blog.title)
    expect(allTitles).not.toContain(blogToDelete.title)
  })
})

describe('update a blog', () => {
  let token

  beforeEach(async () => {
    const newUser = {
      username: 'admin',
      password: 'admin123',
      name: 'root'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const result = await api
      .post('/api/login')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    token = {
      'Authorization': `bearer ${result.body.token}`
    }
  })

  test('succeeds with status code 200 if id is valid', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .set(token)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const updatedBlogsList = await helper.blogsInDb()
    const blogToUpdate = updatedBlogsList.find(blog => blog.title === newBlog.title)

    const updatedBlog = {
      ...blogToUpdate,
      title: 'Updated type wars',
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set(token)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfterUpdate = await helper.blogsInDb()
    expect(blogsAfterUpdate).toHaveLength(helper.initialBlogs.length + 1)

    const updatedBlogData = blogsAfterUpdate.find(blog => blog.title === 'Updated type wars')
    expect(updatedBlogData.likes).toBe(3)
  })
})

afterAll(() => {
  mongoose.connection.close()
})