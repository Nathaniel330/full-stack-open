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
    const parts = [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        }
    ]
         
    return <>
        <Part name={parts[0].name} exercises={parts[0].exercises}/>
        <Part name={parts[1].name} exercises={parts[1].exercises}/>
        <Part name={parts[2].name} exercises={parts[2].exercises}/>
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