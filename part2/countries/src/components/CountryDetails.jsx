const CountryDetails = ({ country, weather }) => {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p><strong>Capital:</strong> {country.capital}</p>
        <p><strong>Area:</strong> {country.area} km²</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map(language => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150px" />

        {weather && (
          <div>
            <h3>Weather in {country.capital}</h3>
            <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
            <p><strong>Weather:</strong> {weather.weather[0].description}</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather icon" />
            <p>{`Wind ${weather.wind.speed} m/s`}</p>
          </div>
        )}
      </div>
    )
  }

  export default CountryDetails