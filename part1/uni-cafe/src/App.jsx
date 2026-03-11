import { useState } from "react"

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (param) => {
    // console.log(param, 'clicked')
    switch (param) {
      case "good":
        setGood(prev => prev + 1)
        break
      case "neutral":
        setNeutral(prev => prev + 1)
        break
      case "bad":
        setBad(prev => prev + 1)
        break
      default:
        break
    }
  }

  return (
    <>
      <h1>Give Feedback</h1>
      <div className="buttons">
        <Button name={"good"} handleClick={handleClick} />
        <Button name={"neutral"} handleClick={handleClick} />
        <Button name={"bad"} handleClick={handleClick} />
      </div>

      <h1>Statistics</h1>
      {
        (good || neutral|| bad)
          ? <Statistics good={good} neutral={neutral} bad={bad}/>
          : <p>No feedback given</p>
      }
    </>
  )
}

export default App

const Statistics = ({good, neutral, bad}) => {
  const all = good+neutral+bad
  const average = (good*(1) - bad*(-1))/all
  const positive = (good / all) * 100

  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"all"} value={all} />
        <StatisticLine text={"average"} value={average.toFixed(2)} />
        <StatisticLine text={"positive"} value={`${positive.toFixed(2)} %`} />
      </tbody>
    </table>
  )
}

const Button = ({name, handleClick}) => {
  return (
    <>
      <button onClick={() => handleClick(name)} style={{textTransform: "capitalize"}}>{name}</button>
    </>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td style={{textTransform: "capitalize", paddingRight:"10px"}}>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
