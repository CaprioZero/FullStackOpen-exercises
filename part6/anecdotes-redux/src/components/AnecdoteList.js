import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const voteAction = () => {
    dispatch(vote(anecdote))
    dispatch(setNotification(`You voted for '${anecdote.content}'`, 5))
  }

  return (
    <>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} vote(s)
        {'\u00A0'}<button onClick={voteAction}>Vote</button>
      </div>
    </>
  )
}

const Anecdotes = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === null) {
      return anecdotes
    } else {
      const regex = new RegExp(filter, 'gi')
      return anecdotes.filter(anecdote => anecdote.content.match(regex))
    }
  })

  return (
    anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
      />
    )
  )
}

export default Anecdotes