import { useState } from 'react'

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticsLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = ({good, neutral, bad, total, score}) => {
  return(
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="total" value={total} />
        <StatisticsLine text="average" value={total === 0 ? 0:(score/total).toFixed(2)} />
        <StatisticsLine text="positive" value={total === 0 ? "0%":((good/total)*100).toFixed(2) + " %"} />
      </tbody>
    </table>
  ) 
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [score, setScore] = useState(0)

  const handleClickGood = () => {
    setGood(prev => prev + 1)
    setTotal(prev => prev + 1)
    setScore(prev => prev + 1)
  }

  const handleClickNeutral = () => {
    setNeutral(prev => prev + 1)
    setTotal(prev => prev + 1)
  }

  const handleClickBad = () => {
    setBad(prev => prev + 1)
    setTotal(prev => prev + 1)
    setScore(prev => prev - 1)
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleClickGood} text="good" />
      <Button onClick={handleClickNeutral} text="neutral" />
      <Button onClick={handleClickBad} text="bad" />
      <h1>statistics</h1>
      {total === 0 ? <p>No feedback given</p>:<Statistics total={total} good={good} bad={bad} neutral={neutral} score={score} />}
    </div>
  )
}

export default App