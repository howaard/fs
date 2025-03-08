import { useState, useEffect } from 'react'
import Search from './components/Search'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewnumber] = useState('')
  const [newInput, setNewInput] = useState('')
  const [notification, setNotification] = useState({message:null, type:"success"})

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const showNotification = (message, type = "success") => {
    setNotification({message, type})
    setTimeout(() => {
      setNotification({message:null, type:"success"})
    }, 3000)
  }

  const addEntry = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const existingPerson = persons.find(person => person.name === newName)
    const newEntry = {name: newName, number: newNumber}

    if (existingPerson){
      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`))
        personServices
          .update(existingPerson.id, newEntry)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === existingPerson.id ? returnedPerson:person))
            showNotification(`Updated ${existingPerson.name}'s number`)
          })
          .catch(error => {
            showNotification(`Error: The contact '${existingPerson.name}' was already removed from the server.`, "error")
            setPersons(persons.filter(person => person.id !== existingPerson.id))
          })

    } else {
      personServices
        .create(newEntry)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewnumber("")
          showNotification(`Added ${newEntry.name}`)
        })

    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewnumber(event.target.value)
  }

  const handleInputChange = (event) => {
    console.log(event.target.value)
    setNewInput(event.target.value)
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)

    if (personToDelete && window.confirm(`Delete ${personToDelete.name}?`))
      personServices
        .remove(id)
        .then(()=>{
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(`The person '${personToDelete.name}' was already removed from server`)
          setPersons(persons.filter(person => person.id !== id))
        })
  }

  // Filter the list before passing it to Persons
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newInput.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Search newInput={newInput} handleInputChange={handleInputChange}/>

      <h3>Add a new</h3>
      <PersonForm 
        addEntry={addEntry} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App