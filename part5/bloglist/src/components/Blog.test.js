import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders blog\'s title and author', () => {
  const blogToUpdate = jest.fn()
  const blogToDelete = jest.fn()

  const user = {
    username: 'admin',
    password: 'admin123',
    name: 'root',
    blogs: []
  }

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'mluukkai',
    url: 'https://fullstackopen.com/en/part5',
    likes: 18,
    user: {
      name: 'root'
    }
  }

  const component = render(
    <Blog blog={blog} blogToUpdate={blogToUpdate} user={user} blogToDelete={blogToDelete} />
  )

  expect(component.container).toHaveTextContent(
    '"Component testing is done with react-testing-library" by "mluukkai"'
  )
})