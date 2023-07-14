const Course = (props) => {
    return <>
        <h2>{props.header.name}</h2>
        <Content course={props.course} />
        <Total parts={props.course.parts} />
    </>
}


const Content = (props) => {
    return <>
        <ul>
            {props.course.parts.map(part =>
                <Part key={part.id} part={part}/>
            )}
        </ul>
    </>
}

const Part = (props) => {
    return <>
        <li>{props.part.name} {props.part.exercises}</li>
    </>
}

const Total = (props) => {
    return <>
        <span>
            <b>
                total of {' '}
                    {props.parts.reduce((acc, c) => 
                        acc + c.exercises
                        , 0
                    )} 
                {' '} exercises
            </b>
        </span>
    </>
}

export default Course