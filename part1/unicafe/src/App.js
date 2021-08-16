import React, { useState } from 'react'
const Header = ({textHeader}) => (
  <h1>{textHeader}</h1>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Text = (props) => (
  <p>{props.text} {props.number}</p>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    setGood(good + 1)
  }

  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleClickBad = () => {
    setBad(bad + 1)
  }

  return (
    <>
      <Header textHeader="give feedback" />
      <Button handleClick={handleClickGood} text='good' />
      <Button handleClick={handleClickNeutral} text='neutral' />
      <Button handleClick={handleClickBad} text='bad' />
      <br/>
      <Header textHeader="statistics" />
      <Text text="good" number={good}/>
      <Text text="neutral" number={neutral}/>
      <Text text="bad" number={bad}/>
    </>
  )
}

export default App
