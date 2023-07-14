import { useState, useEffect } from 'react'
import phonebookServices from './services/phonebook'

const App = () => {
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    //READ
    const fetchPersons = () => {
        phonebookServices
            .getAll()
            .then(response => {
                setPersons(response)
                setTimeout(() => {
                    setSuccessMessage(null)
                }, 2000)
            })
            .catch(error => {
                setErrorMessage(`[ERROR]: ${error.message}!
1. Please check your connection. 
2. Please reload the page.
3. Come back later. The site is under maintenance`)
            })
    }

    useEffect(fetchPersons, [])


    //CREATE
    const addPerson = (e) => {
        e.preventDefault()
        const updatedPersons = [...persons]
        for (let i = 0; i < updatedPersons.length; i++) {
            if (updatedPersons[i].name === newName.trim()) {
                //UPDATE
                if (window.confirm(`${newName.trim()} is already added to the phonebook, replace the old number with a new one?`)) {

                const contact = persons.find(person => person.id === i+1)
                    phonebookServices
                        .update(i+1, {
                            ...contact,
                            number: newNumber
                        })
                        .then(response => {
                            setSuccessMessage(`${contact.name}'s number has been updated`)
                            fetchPersons()
                        })
                        .catch(error => {
                            setErrorMessage(`[ERROR]: ${error.message}!
1. Something went wrong. 
2. Please reload the page.
3. Come back later. The site is under maintenance`)
                            setTimeout(() => {
                                setErrorMessage(null)
                            }, 5000)
                        })
                }
                return;
            }
        }

        phonebookServices
            .create({
                name: newName.trim(),
                number: newNumber
            })
            .then(response => {
                setPersons([...persons].concat(response))
                setSuccessMessage(`${newName.trim()}'s number successfully added`)
                setTimeout(() => {
                    setSuccessMessage(null)
                }, 2000)
            })
            .catch(error => {
                setErrorMessage(`[ERROR]: ${error.message}!
1. Something went wrong. 
2. Please reload the page.
3. Come back later. The site is under maintenance`)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
    }

    //UPDATE
    const reverse = (id) => {
        const contact = persons.find(person => person.id === id)
        phonebookServices
            .update(id, {
                ...contact,
                name: contact.name.split("").reverse().join("")
            })
            .then(response => {
                setPersons(persons.map(person => person.id !== id
                        ? person
                        : response
                ))
                setSuccessMessage(`${contact.name} => ${contact.name.split("").reverse().join("")}`)
                setTimeout(() => {
                    setSuccessMessage(null)
                }, 1000)
            })
            .catch(error => {
                setErrorMessage(`ERROR: ${error.message}!
1. Something went wrong. 
2. Please reload the page.
3. Come back later. The site is under maintenance`)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
    }

    //DELETE
    const remove = (id) => {
        const contact = persons.find(person => person.id === id)
        if (window.confirm(`Delete "${contact.name}" from your phonebook?

This action cannot be undone!`)) {
            phonebookServices
                .remove(id)
                .then(response => {
                    fetchPersons()
                    setSuccessMessage(`${contact.name}'s number has been deleted`)
                        setTimeout(() => {
                            setSuccessMessage(null)
                        }, 2000)
                    })
                .catch(error => {
                    setErrorMessage(`ERROR: ${error.message}!
1. Something went wrong. 
2. Please reload the page.
3. Come back later. The site is under maintenance`)
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                })
        }
    }

    //HTML INPUT STATE CONTROLLERS
    const handleNameChange = (e) => {
        setNewName(e.target.value)
    }

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value)
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    //SEARCH FUNCTIONALITY
    const personsToShow = search
        ?   persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
        :   persons

    return (
        <div>
            <h2>Phonebook</h2>

            <Notification
                message={successMessage ? successMessage : errorMessage ? errorMessage : null}
                color={successMessage ? "green" : "red"}
            />

            <SearchBar 
                search={search}
                handleSearchChange={handleSearchChange}
            />

            <h2>Add a new Contact</h2>

            <AddPersonForm 
                addPerson={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />

            <h2>Numbers</h2>
            
            <Persons 
                personsToShow={personsToShow}
                reverse={reverse}
                remove={remove}
            />
        </div>
    )
}

const Notification = ({ message, color }) => {
    const style = {
        color: color,
        textAlign: "center",
        fontFamily: ["Segoe UI", "monospace"]
    }

    if (message === null) {
        return null
    }
  
    return (
      <div className='message' style={style}>
        {message}
      </div>
    )
}

const Persons = (props) => {
    return <>
        {props.personsToShow.length > 0
            ? props.personsToShow
                .map(person =>
                    <Person key={person.id} 
                            name={person.name} 
                            number={person.number}
                            reverse={(event) => props.reverse(person.id, event)}
                            remove={() => props.remove(person.id)}
                    />
                )
            : "nothing to display"
        }
    </>
}

const Person = (props) => {
    return <li>
        <button onClick={props.remove}>Delete</button>
        <button onClick={props.reverse}>Reverse</button>
        <span>  </span>
        {props.name} {props.number}
    </li>
}

const SearchBar = (props) => {
    return <div>
        [SEARCH] Filter shown with <input onChange={props.handleSearchChange} value={props.search}/>
    </div>
}

const AddPersonForm = (props) => {
    return <form onSubmit={props.addPerson}>
        <div>
            name: <br />
                <input
                    type='string'
                    onChange={props.handleNameChange} 
                    value={props.newName}
                    minLength="3"
                    required
                />
        </div>
        <div>
            number: <br />
                <input
                    type='tel'
                    onChange={props.handleNumberChange} 
                    value={props.newNumber}
                    placeholder='0912 345 6789'
                    required
                />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
}

export default App