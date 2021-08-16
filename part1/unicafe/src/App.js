import React, { useState } from 'react'
const Header = ({ textHeader }) => (
  <h1>{textHeader}</h1>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Text = (props) => {
  if (props.text === "positive") {
    return (
      <p>{props.text} {props.number} %</p>
    )
  }
  return (
    <p>{props.text} {props.number}</p>
  )
}

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const average = (props.bad * (-1) + props.good) / total
  const positive = props.good * (100 / total)
  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <Text text="good" number={props.good} />
      <Text text="neutral" number={props.neutral} />
      <Text text="bad" number={props.bad} />
      <Text text="all" number={total} />
      <Text text="average" number={average} />
      <Text text="positive" number={positive} />
    </div>
  )
}

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
      <br />
      <Header textHeader="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
