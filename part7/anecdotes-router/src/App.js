import React, { useState } from 'react'
import {
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate
} from 'react-router-dom'
import { useField } from './hooks/index'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>Anecdotes</Link>
      <Link to='/create' style={padding}>Create new</Link>
      <Link to='/about' style={padding}>About</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote =>
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

const Anecdote = ({ anecdote, voteFunc }) => {
  return (
    <div>
      <h2>"{anecdote.content}" by "{anecdote.author}"</h2>
      <div>Has {anecdote.votes} vote(s)</div>
      <div>For more info see {anecdote.info}</div>
      <button onClick={() => voteFunc(anecdote.id)}>Vote</button>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const contentHook = useField('content')
  const authorHook = useField('author')
  const infoHook = useField('info')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: contentHook.value,
      author: authorHook.value,
      info: infoHook.value,
      votes: 0
    })
    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    contentHook.reset()
    authorHook.reset()
    infoHook.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentHook} />
        </div>
        <div>
          author
          <input {...authorHook} />
        </div>
        <div>
          url for more info
          <input {...infoHook} />
        </div>
        <button>create</button>{'\u00A0'}<button onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

const Notification = ({ notification }) => {
  const style = {
    "color": "green",
    "background": "lightgrey",
    "fontSize": "20px",
    "borderStyle": "solid",
    "borderRadius": "5px",
    "padding": "10px",
    "margin": "10px"
  }

  if (notification === null) {
    return null
  } else if (notification) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState(null)

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))

    if (window.timeOutId) {
      window.clearTimeout(window.timeOutId)
    }
    setNotification(`"${anecdote.content}" added successfully`)
    window.timeOutId = setTimeout(() => {
      setNotification(null)
    }, 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))

    if (window.timeOutId) {
      window.clearTimeout(window.timeOutId)
    }
    setNotification(`You voted for "${anecdote.content}" successfully`)
    window.timeOutId = setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === match.params.id)
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />

      <Routes>
        <Route path="/" element={<><Notification notification={notification} /><AnecdoteList anecdotes={anecdotes} /></>} />
        <Route path="anecdotes/:id" element={<><Notification notification={notification} /><Anecdote anecdote={anecdote} voteFunc={vote} /></>} />
        <Route path="about" element={<About />} />
        <Route path="create" element={<CreateNew addNew={addNew} />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>

      <br />

      <Footer />
    </div>
  )
}

export default App;