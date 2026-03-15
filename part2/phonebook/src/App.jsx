import { useState, useEffect } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import servePerson from './services/persons'
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    servePerson
      .getPersons()
      .then(fetchedPersons => setPersons(fetchedPersons))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    const targetPerson = persons.find(p => p.name.toLowerCase() === newPerson.toLowerCase())

    if(targetPerson) {
      if(confirm(`${newPerson} is already in the list. Update their number?`)) {
        servePerson
          .updatePerson(targetPerson.id, {name: newPerson, number: newNumber})
          .then(updatedPerson => {
            setPersons(prevPersons => prevPersons.map(prevPerson => prevPerson.id === targetPerson.id ? updatedPerson : prevPerson))
            showTemporaryMessage({type: 'confirm', content: `Updated ${updatedPerson.name}'s number!`})
          })
          .catch(error => {
            setPersons(prevPersons => prevPersons.filter(person => person.id !== targetPerson.id))
            showTemporaryMessage({type: 'error', content: `${targetPerson.name} was deleted in the server`})
          })
      }
    } else {
      servePerson
      .createPerson({name: newPerson, number: newNumber})
      .then(createdPerson => {
        setPersons(prevPersons => [...prevPersons, createdPerson])
        showTemporaryMessage({type: 'confirm', content: `Added ${createdPerson.name}`})
      })
    }

    setNewPerson('')
    setNewNumber('')
  }

  const handleDelete = (id) => {
    const targetPerson = persons.find(p => p.id === id)
    
    if(confirm(`Delete ${targetPerson.name}?`)) {
      servePerson
        .deletePerson(id)
        .then(() => {
          setPersons(prevPersons => prevPersons.filter(p => p.id !== id))
        })
        .catch(error => {
          setPersons(prevPersons => prevPersons.filter(person => person.id !== id))
          showTemporaryMessage({type: 'error', content: `${targetPerson.name} was already deleted in the server`})
        })
    }  
  }

  const handlePersonChange = (event) => {
    setNewPerson(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const showTemporaryMessage = (message) => {
    setMessage(message)
    setTimeout(()=>{
      setMessage(null)
    }, 3000)
  }

  const personsToShow = filter
                          ? persons.filter(person => person.name.toLowerCase().includes(filter))
                          : persons

  // useEffect(() => {
  //   console.log(personsToShow)
  // }, [personsToShow])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        handleFilterChange={handleFilterChange}
        filter={filter} 
      />
      
      <h4>Add a new Number</h4>
      <Notification message={message}/>
      <PersonForm 
        handleSubmit={handleSubmit}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
        newPerson={newPerson}
        newNumber={newNumber}
      />
      
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
      
    </div>
  )
}

export default App
