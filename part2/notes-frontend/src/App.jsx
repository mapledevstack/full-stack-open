import Note from './components/Note'
import { useState } from "react"

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll
                      ? notes
                      : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault()
    // console.log("clicked")

    const newObject = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() > 0.5
    }

    setNotes([...notes, newObject])
    setNewNote('')
  }

  const handleChange = (event) => {
    // console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      
      <button onClick={() => setShowAll(!showAll)}>
        Show {showAll ? 'Important' : 'All'}
      </button>
      
      <ul>
        {notesToShow.map((note, index) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>

      <form onSubmit={addNote}>
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
