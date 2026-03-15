const Note = ({note, handleImportanceToggle}) => {
  const label = note.important
                  ? 'Mark as unimportant'
                  : 'Mark as important' 

  return (
    <li>
      <label>{note.content} </label>
      <button onClick={() => handleImportanceToggle(note.id)}>{label}</button>
    </li>
  )
}

export default Note
