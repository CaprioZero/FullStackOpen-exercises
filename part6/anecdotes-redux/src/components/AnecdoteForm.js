import React from 'react'
// import { useDispatch } from 'react-redux'  hook way
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux' 

const NewAnecdote = (props) => {
  // const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    // dispatch(createAnecdote(content))
    // dispatch(setNotification(`'${content}' added successfully`, 5))
    props.createAnecdote(content)
    props.setNotification(`'${content}' added successfully`, 5)
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

// export default NewAnecdote

//alt way of using connect like in Filter
const mapDispatchToProps = dispatch => {
  return {
    createAnecdote: value => {
      dispatch(createAnecdote(value))
    },
    setNotification: (content, time) => {
      dispatch(setNotification(content, time))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(NewAnecdote)