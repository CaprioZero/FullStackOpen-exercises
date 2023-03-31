import { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommendation from './components/Recommendation'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import { BOOK_ADDED, ALL_BOOKS } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const loggedInUser = localStorage.getItem('library-user-token')
    if (loggedInUser) {
      setToken(loggedInUser)
    }
  }, [setToken])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    },
  })

  return (
    <div>
      <Notification errorMessage={errorMessage} />
      {/* refactor login to be a separate page because ME query need token from login and it doesn't get it on first load so it return null*/}
      {!token ? (
        <>
          <Notification errorMessage={errorMessage} />
          <h2>Login</h2>
          <LoginForm setToken={setToken} setError={notify} />
        </>
      ) : (
        <>
          <div>
            <button onClick={() => setPage('authors')}>authors</button>
            <button onClick={() => setPage('books')}>books</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </div>

          <Authors show={page === 'authors'} setError={notify} />

          <Books show={page === 'books'} />

          <NewBook show={page === 'add'} setError={notify} />

          <Recommendation show={page === 'recommend'} />

        </>
      )}

    </div>
  )
}

export default App