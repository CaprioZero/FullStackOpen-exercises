import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('create new blog', () => {
  const blogData = jest.fn()

  const component = render(
    <BlogForm blogData={blogData} />
  )

  const inputTitle = component.container.querySelector('#title')
  const inputAuthor = component.container.querySelector('#author')
  const inputUrl = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, {
    target: { value: 'Component testing is done with react-testing-library' }
  })
  fireEvent.change(inputAuthor, {
    target: { value: 'mluukkai' }
  })
  fireEvent.change(inputUrl, {
    target: { value: 'https://fullstackopen.com/en/part5' }
  })
  fireEvent.submit(form)

  expect(blogData.mock.calls).toHaveLength(1)
  expect(blogData.mock.calls[0][0].title).toBe('Component testing is done with react-testing-library')
  expect(blogData.mock.calls[0][0].author).toBe('mluukkai')
  expect(blogData.mock.calls[0][0].url).toBe('https://fullstackopen.com/en/part5')
})