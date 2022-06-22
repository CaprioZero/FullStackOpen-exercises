import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS, ME } from '../queries'

const Recommend = ({ show }) => {
  const [books, setBooks] = useState(null)
  const [user, setUser] = useState(null)

  const booksList = useQuery(ALL_BOOKS)
  const userResult = useQuery(ME)

  useEffect(() => {
    if (userResult.loading === false && userResult.data) {
      setUser(userResult.data.me)
    }
  }, [userResult.data, userResult.loading])

  useEffect(() => {
    if (booksList.loading === false && booksList.data) {
      setBooks(booksList.data.allBooks)
    }
  }, [booksList.loading, booksList.data])

  if (!show) {
    return null
  }

  if (booksList.loading && userResult.loading) {
    return <div>loading...</div>
  }

  const recommendedBooks = books.filter(val => val.genres.includes(user.favoriteGenre))

  return (
    <div>
      <h2>Recommendations</h2>
      <p>book in your favorite genre <b>{user.favoriteGenre}</b></p>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend