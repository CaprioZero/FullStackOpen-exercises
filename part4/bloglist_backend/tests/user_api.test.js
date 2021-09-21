const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('admin123', 10)
  const user = new User({ username: 'admin', passwordHash, name: 'root' })

  await user.save()
}, 150000)

describe('when there is initially one user in db', () => {
  test('a valid user can be added', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: 'test',
        password: 'test123',
        name: 'NRG'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(n => n.username)
    expect(usernames).toContain('test')
  })

  test('fails with status code 400 if username is taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: 'admin',
        password: 'test123',
        name: 'NRG'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    expect(result.body.error).toContain('expected `username` to be unique')
  })

  test('fails with status code 400 if username is shorter than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: 'ad',
        password: 'test123',
        name: 'NRG'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    expect(result.body.error).toContain('is shorter than the minimum allowed length')
  })

  test('fails with status code 400 if password is shorter than 3 characters or missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: 'test',
        password: 'te',  //comment password key to test missing password condition
        name: 'NRG'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    expect(result.body.error).toContain('is not given or shorter than 3 characters')
  })
})

afterAll(() => {
  mongoose.connection.close()
})