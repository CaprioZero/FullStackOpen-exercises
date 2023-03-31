import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'
const _ = require('lodash')

const Books = ({ show }) => {
  const [books, setBooks] = useState(null)
  const [genre, setGenre] = useState("all")

  const originalBooksList = useQuery(ALL_BOOKS)
  const [booksList, { loading, data }] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (genre === "all") {
      booksList()
    } else {
      booksList({ variables: { genre } })
    }
  }, [booksList, genre])

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks)
    }
  }, [data, setBooks])

  if (!show) {
    return null
  }

  if (originalBooksList.loading && loading) {
    return <div>loading...</div>
  }

  const genresList = ["all"].concat(
    _.union(
      originalBooksList.data.allBooks.reduce((arr, book) => {
        return arr.concat(book.genres)
      }, [])
    )
  )

  const handleClick = (event) => {
    const filterValue = event.target.innerText
    if (filterValue === "all") {
      document.getElementById("genre").innerHTML = ''
    } else {
      document.getElementById("genre").innerHTML = 'in genre ' + filterValue.bold()
    }
    setGenre(filterValue)
  }

  return (
    <div>
      <h2>Books</h2>
      <p id='genre'></p>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genresList.map((genre) => (
          <button key={genre} onClick={handleClick} type="button">
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books