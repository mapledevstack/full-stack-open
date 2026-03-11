import { useState } from "react"

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleNext = () => {
    const random = Math.floor(anecdotes.length * Math.random())
    setSelected(random)
  }

  const handleVote = () => {
    setVotes(prevVotes => {
        const newVotes = [...prevVotes]
        newVotes[selected]++
        return newVotes
    })
  }

  return (
    <>
      <h1>Anecdote of the Day</h1>
      <button onClick={handleNext}>Next</button>
      <button onClick={handleVote}>Vote</button>
      <div style={{paddingTop: "15px"}}>{anecdotes[selected]}</div>
      <p>has {votes[selected]} votes</p>

      <h1>Anecdote with most votes</h1>
      <MaxAnecdote anecdotes={anecdotes} votes={votes}/>
    </>
  )
}

export default App

const MaxAnecdote = ({anecdotes, votes}) => {
  let maxIndex = 0
  let maxValue = 0

  votes.forEach((value, index) => {
    if (value > maxValue) {
      maxIndex = index
      maxValue = value
    }
  })

  return (
    maxValue === 0
    ? <p>No votes yet...</p>  
    : (
      <>
        <div>{anecdotes[maxIndex]}</div>
        <p>has {maxValue} votes</p>
      </>
    )
  )
}
