import React, { useState, useEffect } from 'react'
const _ = require('lodash')

const Books = ({ show, booksList }) => {
  const [books, setBooks] = useState(null)
  const [filteredBooks, setFilteredBooks] = useState(null)

  useEffect(() => {
    if (booksList.loading === false && booksList.data) {
      setBooks(booksList.data.allBooks)
    }
  }, [booksList.loading, booksList.data])

  if (!show) {
    return null
  }

  if (booksList.loading) {
    return <div>loading...</div>
  }

  const genresList = ["all"].concat(
    _.union(
      books.reduce((arr, book) => {
        return arr.concat(book.genres)
      }, [])
    )
  )

  const handleClick = (event) => {
    const filterValue = event.target.innerText
    const filteredBooks = books.filter(val => val.genres.includes(filterValue))

    if (filterValue === "all") {
      document.getElementById("genre").innerHTML = ''
      return setFilteredBooks(books)
    } else {
      document.getElementById("genre").innerHTML = 'in genre ' + filterValue.bold()
      setFilteredBooks(filteredBooks)
    }
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
          {filteredBooks ? filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )) : books.map((a) => (
            <tr key={a.title}>
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