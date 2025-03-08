import ShowBtn from './ShowBtn'
import CountryDetails from './CountryDetails'

const DisplayCountries = ({countries, handleShow}) => {
    if (countries.length > 10){
        return <p>Too many matches, specfiy another filter</p>
    }

    if (countries.length > 1){
        return(
        <div>
            {countries.map(country => (
                <p key={country.cca3}>{country.name.common} <ShowBtn handleShow={handleShow} country={country} /></p>
            ))}
        </div>
        )
    }

    if (countries.length === 1){
        <CountryDetails country={countries[0]} />
    }

    return null
}

export default DisplayCountries