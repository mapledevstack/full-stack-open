import Note from './components/Note'
import { useEffect, useState } from "react"
import axios from 'axios'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll
                      ? notes
                      : notes.filter(note => note.important)
  
  useEffect(() => {
    noteService
      .getAll()
      .then(res => setNotes(res))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    noteService
      .create({content: newNote, important: false})
      .then(res => {
        setNotes(prevNotes => [...prevNotes, res])
        setNewNote('')
      })
  }

  const handleImportanceToggle = (id) => {
    const requiredNote = notes.find(note => note.id === id)
    const changedNote = {...requiredNote, important: !requiredNote.important}
    
    noteService
      .update(id, changedNote)
      .then(res => setNotes(prevNotes => prevNotes.map(note => note.id === id ? res : note)))
      .catch(error => {
        alert(`Note id = ${id} was removed from the server`)
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
      })
  }

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      
      <button onClick={() => setShowAll(!showAll)}>
        Show {showAll ? 'Important' : 'All'}
      </button>
      
      <ul>
        {notesToShow.map(note => (
          <Note key={note.id} note={note} handleImportanceToggle={handleImportanceToggle} />
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
           value={newNote}
           onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App
