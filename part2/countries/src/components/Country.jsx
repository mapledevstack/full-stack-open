import { useState } from "react"
import { useEffect } from "react"
import axios from 'axios'

const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const Country = ({country}) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${apiKey}&units=metric`)
      .then(res => setWeather(res.data))
  }, [country])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {
          Object.values(country.languages).map((lang,i) => <li key={i}>{lang}</li>)
        }
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />

      {
        weather && (
          <div>
            <h2>Weather in {country.capital}</h2>
            <p>Temperature {weather.main.temp} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
            <p>Wind {weather.wind.speed} m/s</p>
          </div>
        )
      }
    </div>
  )
}
export default Country
