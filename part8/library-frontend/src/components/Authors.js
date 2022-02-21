import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR_BIRTH, ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [changeBirthYear, result] = useMutation(EDIT_AUTHOR_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = (event) => {
    event.preventDefault()

    changeBirthYear({ variables: { name, born: parseInt(born, 10) } })

    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('author not found')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  if (!props.show) {
    return null
  }

  if (props.authorsList.loading) {
    return <div>loading...</div>
  }

  const authors = props.authorsList.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((author, index) =>
              <option key={index} value={author.name}>{author.name}</option>
            )}
          </select>
        </div>
        <div>
          born <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>Update author</button>
      </form>
    </div>
  )
}

export default Authors