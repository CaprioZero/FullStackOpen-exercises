import React, { useState } from 'react'
const Header = ({ textHeader }) => (
  <h1>{textHeader}</h1>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = ({ text, points }) => {
  if (points === 0) {
    return (
      <div>
        <p>{text}</p>
        <p>has 0 votes</p>
      </div>
    )
  }
  return (
    <div>
      <p>{text}</p>
      <p>has {points} votes</p>
    </div>
  )
}

const MostVote = ({ anecdotes, points }) => {
  const highestPoints = Math.max(...points)
  const arrayIndex = points.indexOf(highestPoints)
  const firstPlace = anecdotes[arrayIndex]
  if (highestPoints === 0) {
    return (
      <p>Vote something!</p>
    )
  }
  return (
    <div>
      <p>{firstPlace}</p>
      <p>has {highestPoints} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState(Array(7).fill(0))

  const handleRandomAnecdote = () => {
    const arrayIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(arrayIndex)
  }

  const handleClickPoints = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <>
      <Header textHeader="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} points={points[selected]} />
      <Button handleClick={handleClickPoints} text="vote" />
      <Button handleClick={handleRandomAnecdote} text="next anecdote" />
      <br />
      <Header textHeader="Anecdote with most votes" />
      <MostVote anecdotes={anecdotes} points={points} />
    </>
  )
}

export default App