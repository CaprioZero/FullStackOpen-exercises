import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component testing', () => {
  let component
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

  beforeEach(() => {
    component = render(
      <Blog blog={blog} blogToUpdate={blogToUpdate} user={user} blogToDelete={blogToDelete} />
    )
  })

  test('renders blog\'s title and author', () => {

    expect(component.container).toHaveTextContent(
      '"Component testing is done with react-testing-library" by "mluukkai"'
    )
  })

  test('blog\'s url and number of likes are shown when click view', () => {

    const button = component.getByText('View')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'https://fullstackopen.com/en/part5'
    )

    expect(component.container).toHaveTextContent(
      '18'
    )
  })
})