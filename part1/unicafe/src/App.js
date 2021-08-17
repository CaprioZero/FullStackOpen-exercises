import React, { useState } from 'react'
const Header = ({ textHeader }) => (
  <h1>{textHeader}</h1>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

// const StatisticLine = (props) => (
//     <tr><td>{props.text}</td><td>{props.value}</td></tr>
// )

const StatisticLine = (props) => {
  if (props.text === "positive") {
    return (
      <tr><td>{props.text}</td><td>{props.value} %</td></tr>
    )
  }
  return (
    <tr><td>{props.text}</td><td>{props.value}</td></tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (bad * (-1) + good) / total
  const positive = good * (100 / total)
  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
          {/*<StatisticLine text="positive" value={`${positive} %`} />*/}
        </tbody>
      </table>
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

  //Alternative way to save clicks of each button to its own state with object spread syntax (...clicks)
  // const [clicks, setClicks] = useState({
  //   good: 0, neutral: 0, bad: 0
  // })

  // const handleClickGood = () =>
  //   setClicks({...clicks, good: clicks.good + 1})

  // const handleClickNeutral = () =>
  //   setClicks({...clicks, neutral: clicks.neutral + 1})

  // const handleClickBad = () =>
  //   setClicks({...clicks, bad: clicks.bad + 1})

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
