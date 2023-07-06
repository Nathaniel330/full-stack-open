const App = () => {
    const course = 'Half Stack application development'
    const exercises1 = 10
    const exercises2 = 7
    const exercises3 = 14
  
    return <>
        <Header course={course}/>
        <Content/>
        <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
    </>
}

const Header = (props) => {
    return <>
        <h1>{props.course}</h1>
    </>
}

const Content = () => {
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }
         
    return <>
        <Part name={part1.name} exercises={part1.exercises}/>
        <Part name={part2.name} exercises={part2.exercises}/>
        <Part name={part3.name} exercises={part3.exercises}/>
    </>
}

const Part = (props) => {
    return <>
        <p>{props.name} {props.exercises}</p>
    </>
}

const Total = (props) => {
    return <>
        <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </>
}

export default App