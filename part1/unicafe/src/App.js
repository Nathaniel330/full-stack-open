import { useState } from 'react'

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [totalFeedback, setTotal] = useState(0)

    const goodClick = () => {
        const updated = good + 1
        setGood(updated)
        setTotal(updated + neutral + bad)
    }

    const neutralClick = () => {
        const updated = neutral + 1
        setNeutral(updated)
        setTotal(good + updated + bad)
    }

    const badClick = () => {
        const updated = bad + 1
        setBad(updated)
        setTotal(good + neutral + updated)
    }

    const average = (good, bad) => {
        return ( (good + (bad * -1)) / totalFeedback ).toFixed(2)
    }

    const positive = (good) => {
        return ( (good / totalFeedback ) * 100 ).toFixed(2)
    }

    return <>
        <h1>Unicafe Feedback</h1>
        <Button handleClick={goodClick} text="Good"/>
        <Button handleClick={neutralClick} text="Neutral"/>
        <Button handleClick={badClick} text="Bad"/>
        <h2>Statistics</h2>
        <Statistics good={good} neutral={neutral} bad={bad} totalFeedback={totalFeedback} average={average(good, bad)} positive={positive(good)}/>
    </>
}

const Button = ({handleClick, text}) => {
    return <>
        <button onClick={handleClick}>{text}</button>
    </>
}

const Statistics = ({good, neutral, bad, totalFeedback, average, positive}) => {
    return <>
        {totalFeedback > 0
            ?
            <table>
                <tbody>
                    <StatisticLine text="Good" feedback={good}/>
                    <StatisticLine text="Neutral" feedback={neutral}/>
                    <StatisticLine text="Bad" feedback={bad}/>
                    <StatisticLine text="Total" feedback={totalFeedback}/>
                    <StatisticLine text="Average" feedback={average}/>
                    <StatisticLine text="Positive" feedback={positive}/>
                </tbody>
            </table> 
            : 
            <p>No Feedback Given</p>
        }
    </>
}

const StatisticLine = ({text, feedback}) => {
    return <>
        <tr>
            <th> {text} </th>
            <td> {feedback} {text === "Positive" && "%"}</td>
        </tr>
    </>
}

export default App