const PersonForm = ({handleSubmit, handlePersonChange, handleNumberChange, newPerson, newNumber}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input onChange={handlePersonChange} value={newPerson}/> <br />
        <label>Phone: </label>
        <input onChange={handleNumberChange} value={newNumber} /> <br />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
export default PersonForm
