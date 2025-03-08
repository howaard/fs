import { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayCountries from './components/DisplayCountries.jsx'
import CountryDetails from './components/CountryDetails.jsx'

function App() {
  const [input, setInput] = useState('')
  const [countries,setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() =>{
    console.log('effect run, input is now', input)

    // avoid excessive api calls
    if (input.length < 2){
      setCountries([])
      setSelectedCountry(null)
      return
    }

    const fetchCountries = setTimeout(() => {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response =>{
          const filteredCountries = response.data.filter(
            country => country.name.common.toLowerCase().includes(input.toLowerCase())
          )

          if (filteredCountries.length === 1){
            setSelectedCountry(filteredCountries[0])
            setCountries([])
          } else{
            setCountries(filteredCountries)
            setSelectedCountry(null)
          }
        })
        .catch(error =>{
          console.error('Error fetching countries:', error)
          setCountries([])
        })
    }, 500) // delay 100ms

    return () => clearTimeout(fetchCountries)

  }, [input])

  useEffect(() => {
    if (selectedCountry){
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
      const lat = selectedCountry.latlng[0]
      const lon = selectedCountry.latlng[1]

      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then((response) =>{
          setWeather(response.data)
        })
        .catch((error) =>{
          console.error("Error fetching weather:" , error)
        })
    }
  }, [selectedCountry])

  const handleInputChange = event => {
    setInput(event.target.value)
    setSelectedCountry(null) // Reset selection when user types a new query
  }

  const handleShow = (country) => {
    setSelectedCountry(country)
  }

  return (
    <div>
      <form>
        find countries <input value={input} onChange={handleInputChange} />
      </form>

      {selectedCountry ? (
        <CountryDetails country={selectedCountry} weather={weather} />
      ) :
        (<DisplayCountries countries={countries} handleShow = {handleShow} />)
      }
    </div>
  )
}

export default App
