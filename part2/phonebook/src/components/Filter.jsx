const Filter = ({handleFilterChange, filter}) => {
  return (
    <div>
      <label>Filter shown with: </label>
      <input onChange={handleFilterChange} value={filter} />
    </div>
  )
}
export default Filter
