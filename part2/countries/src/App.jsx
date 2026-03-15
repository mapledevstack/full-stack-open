import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios'
import Country from "./components/Country"

const App = () => {
  // const baseURL = 'https://studies.cs.helsinki.fi/restcountries'
  const baseURL = 'https://restcountries.com/v3.1'

  const [input, setInput] = useState('')
  const [countries, setCountries] = useState([])
  const [show, setShow] = useState([])

  useEffect(() => {
    axios
      .get(`${baseURL}/all?fields=name,capital,area,languages,flags,cca3`)
      .then(res => {
        setCountries(res.data)
        setShow(res.data.map(c => ({show: false, id: c.cca3})))
        console.log(`Fetched ${res.data.length} countries`)
      })
  }, [])

  const handleChange = (event) => {
    setInput(event.target.value)
  }


  const toggleShow = (id) => {
    setShow(prevShow =>
      prevShow.map(x => x.id === id ? {...x, show: !x.show} : {...x})
    )
  }
  
  const renderCountries = (countries) => {
    return countries.map(c => {
      return (
          <div key={c.cca3}>
            <label>{c.name.common}</label>
            <button onClick={() => toggleShow(c.cca3)}>{show.find(x => x.id === c.cca3).show ? 'Hide' : 'Show'}</button>
            {
              show.find(x => x.id === c.cca3).show 
                ? <Country country={c}/>
                : null
            }
          </div>
        )
    })
  }

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(input.toLowerCase()))

  return (
    <div>
      <label>Find Country: </label>
      <input type="text" value={input} onChange={handleChange}/>
      <div>
      {
        (!input) && <p>Type something to filter...</p>
        || (filteredCountries.length > 10) && <p>Too many matches...</p>
        || (filteredCountries.length > 0 && filteredCountries.length !== 1) && <div>{renderCountries(filteredCountries)}</div>
        || (filteredCountries.length === 1) && <Country country={filteredCountries[0]}/>
        || <p>No matches</p>
      }
      </div>
    </div>
  )
}
export default App
