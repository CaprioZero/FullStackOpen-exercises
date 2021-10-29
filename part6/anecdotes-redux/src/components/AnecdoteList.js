import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} vote(s)
        {'\u00A0'}<button onClick={handleClick}>Vote</button>
      </div>
    </>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return (
    anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() =>
          dispatch(vote(anecdote.id))
        }
      />
    )
  )
}

export default Anecdotes