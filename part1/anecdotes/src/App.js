import { useState } from 'react'

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

    const handleNext = () => setSelected(Math.floor(Math.random() * anecdotes.length))

    const handleVote = () => {
        const updatedVotes = [...votes]
        updatedVotes[selected] += 1
        setVotes(updatedVotes)
    }

    return <>
        <Section
            anecdotes={anecdotes}
            selected={selected}
            votes={votes}
            handleVote={handleVote}
            handleNext={handleNext}
            headline="Anecdote of the Day"
        />

        { Math.max(...votes) !== 0 &&
        <Section 
            anecdotes={anecdotes}
            selected={selected}
            votes={votes}
            headline="Anecdote with most votes"
        />}
    </>
}

const Section = ({anecdotes, selected, votes, handleVote, handleNext, headline}) => {
    return <>
        <Headline headline={headline} />
        <Anecdote 
            anecdotes={anecdotes}
            selected={selected}
            votes={votes}
            headline={headline}
        />
        <Votes
            selected={selected}
            votes={votes}
            headline={headline}
        />
        {headline === "Anecdote of the Day" && <Button handleClick={handleVote} text="vote" />}
        {headline === "Anecdote of the Day" && <Button handleClick={handleNext} text="next anecdote" />}
    </>
}

const Anecdote = ({anecdotes, selected, votes, headline}) => {
    const indexOfAnecdoteWithMostVotes = votes.indexOf(Math.max(...votes))

    if (headline === "Anecdote of the Day") {
        return <>
            {anecdotes[selected]}
        </>
    }

    return <>
        {anecdotes[indexOfAnecdoteWithMostVotes]}
    </>
}

const Votes = ({selected, votes, headline}) => {
    const indexOfAnecdoteWithMostVotes = votes.indexOf(Math.max(...votes))

    if (headline === "Anecdote of the Day") {
        return <>
            <br />
            has {votes[selected]} votes
            <br />
        </>
    }

    return <>
        <br />
            has {votes[indexOfAnecdoteWithMostVotes]} votes
        <br />
    </>
}

const Headline = ({headline}) => {
    return <>
        <h1>{headline}</h1>
    </>
}

const Button = ({handleClick, text}) => {
    return <>
        <button onClick={handleClick}>{text}</button>
    </>
}

export default App