import { useState } from 'react'

const getRandomInt = ({min, max}) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Button = ({onClick, text}) => {
  return(
    <button onClick = {onClick}>{text}</button>
  )
}

const DisplayMostVotes = ({anecdotes, votes}) => {
  const maxVotes = Math.max(...votes)
  const maxIndex = votes.indexOf(maxVotes)

  if (maxVotes === 0){
    return <p>No votes yet!</p>
  }

  return (
    <>
      <p>{anecdotes[maxIndex]}</p>
      <p>has {maxVotes} votes</p>
    </>
  )
}

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
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleClickNext = () => {
    setSelected(prev => getRandomInt({min: 0, max: anecdotes.length -1}))
  }

  const handleClickVote = () => {
    setVotes((prevVotes) => {
      const newVotes = [...prevVotes]
      newVotes[selected] += 1
      return newVotes
    }
  )
  }

  return (
    <div>
      <h1>Anecdotes of the day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <Button onClick = {handleClickVote} text = "vote" />
      <Button onClick = {handleClickNext} text = "next anecdote" />
      <h1>Anecdotes with most votes</h1>
      <DisplayMostVotes anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App