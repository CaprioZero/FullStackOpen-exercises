import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      notify(error.graphQLErrors[0].message)
    }
  })

  if (!props.show) {
    return null
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const submit = async (event) => {
    event.preventDefault()

    createBook({ variables: { title, author, published: parseInt(published, 10), genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <div>
        <form onSubmit={submit}>
          <div>
            title
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)} />
          </div>
          <div>
            author
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)} />
          </div>
          <div>
            published
            <input
              type="number"
              value={published}
              onChange={({ target }) => setPublished(target.value)} />
          </div>
          <div>
            <input
              value={genre}
              onChange={({ target }) => setGenre(target.value)} />
            <button onClick={addGenre} type="button">
              add genre
            </button>
          </div>
          <div>genres: {genres.join(' ')}</div>
          <button type="submit">create book</button>
        </form>
      </div>
    </>
  )
}

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

export default NewBook