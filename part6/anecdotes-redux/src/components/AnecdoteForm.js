import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(createNotification(`'${content}' added successfully`))
    setTimeout(() => {
      dispatch({ type: 'DELETE_NOTIFICATION' })
    }, 5000)
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default NewAnecdote