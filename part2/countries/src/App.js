import { useState, useEffect } from 'react'
const api_key = process.env.REACT_APP_API_KEY

const App = () => {
    const [countries, setCountries] = useState([])
    const [weatherDetails, setWeatherDetails] = useState([])
    const [search, setSearch] = useState('')
    const [searchFilter, setSearchFilter] = useState('Includes')
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(response => response.json())
            .then(data => {
                setCountries(data)
        })
    }, [])

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const searchFilterToStartsWith = () => {
        setSearchFilter('StartsWith')
    }

    const searchFilterToIncludes = () => {
        setSearchFilter('Includes')
    }

    const searchFilterToEndsWith = () => {
        setSearchFilter('EndsWith')
    }

    const countriesToShowFiltered = search
        ? searchFilter === 'StartsWith'
            ? countries.filter(country => country.name.common.toLowerCase().startsWith(search.toLowerCase()))
            : searchFilter === 'Includes'
                ? countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
                : searchFilter === 'EndsWith'
                    ? countries.filter(country => country.name.common.toLowerCase().endsWith(search.toLowerCase()))
                    : countries
        : countries.sort((a, b) => a.name.common > b.name.common ? 1 : -1)

    const countriesToShow = search
        ? countriesToShowFiltered.length > 10
            ? 'Too many matches. Specify another filter.'
            : countriesToShowFiltered.length > 1 && countriesToShowFiltered.length <= 10
                ? countriesToShowFiltered
                : countriesToShowFiltered.length === 1
                    ? countriesToShowFiltered[0]
                    : countriesToShowFiltered.length < 1
                        ? 'No matches found with your search filter'
                        : countriesToShowFiltered
        : countriesToShowFiltered

    const handleShowInfo = (country) => {
        const languages = Object.entries(country.languages).map(([key, value]) => (value))
        setInfo([country.name.common, country.capital[0], country.area, languages, country.flags.svg])
        window.scroll(0, 0)
    }

    const clear = () => {
        setInfo([])
    }
    return <>
        <h1>World Countries</h1>
      
        <SearchBar search={search} handleSearchChange={handleSearchChange} searchFilter={searchFilter}/>
        <br />
        <SearchSettings 
            searchFilterToStartsWith={searchFilterToStartsWith}
            searchFilterToIncludes={searchFilterToIncludes}
            searchFilterToEndsWith={searchFilterToEndsWith}
        />

        <Countries 
            countries={countriesToShow}
            handleShowInfo={handleShowInfo}
            info={info}
            clear={clear}
            weatherDetails={weatherDetails}
            setWeatherDetails={setWeatherDetails}
        />
    </>
}

const SearchBar = ({search, handleSearchChange, searchFilter}) => {
    return <>
       [Search] <input onChange={handleSearchChange} value={search} placeholder={`Filter:  ${searchFilter}`}/>
    </>
}

const SearchSettings = ({searchFilterToStartsWith, searchFilterToIncludes, searchFilterToEndsWith}) => {
    return <>
        <SearchButton setSearchFilter={searchFilterToStartsWith} filter="StartsWith"/>
        <SearchButton setSearchFilter={searchFilterToIncludes} filter="Includes"/>
        <SearchButton setSearchFilter={searchFilterToEndsWith} filter="EndsWith"/>
    </>
}

const SearchButton = ({setSearchFilter, filter}) => {
    return <button onClick={setSearchFilter}>{filter}</button>
}

const Countries = ({countries, handleShowInfo, info, clear, weatherDetails, setWeatherDetails}) => {

    if (Array.isArray(countries)) {             //expected. iterate the ~~array
        return <>
            {info.length > 0 && 
                <>
                    <h1>{info[0]}</h1>
                    <span>Capital: {info[1]}</span>
                    <span>Area: {info[2]} km<sup>2</sup></span>
                    <b>Languages:</b>
                    {info[3].map(language => <li key={language}>{language}</li>)}
                    <img alt={`The flag of ${info[0]}`} src={info[4]} style={{width: '500px'}}/>
                    <br />
                    <button onClick={clear}>clear</button>
                </>
            }
            <ul>
                {countries.map(country => 
                <li key={country.name.common}> 
                    <button onClick={() => {handleShowInfo(country)}}
                        >show
                    </button> {country.name.common}
                </li>)}
            </ul>
        </>
        

    } else if (                                 //tricky. do something when filtered array has lengh === 1. ~~object
        typeof countries === 'object' &&
        !Array.isArray(countries) &&
        countries !== null) {
        return <div>
            <h1>{countries.name.common}</h1> 
            <span>Capital: {countries.capital[0]}</span>
            <span>Area: {countries.area} km<sup>2</sup></span>
            <b>Languages:</b>
            <ul>
                {Object.entries(countries.languages).map(([key, value]) => (
                    <li key={value}>
                        {value}
                    </li>
                ))}
            </ul>
            <img alt={`The flag of ${countries.name.common}`} src={countries.flags.svg} style={{width: '500px'}}/>
            <WeatherComponent country={countries} weatherDetails={weatherDetails} setWeatherDetails={setWeatherDetails}/>
        </div>
        
    } else {                                    //too many search results. ~~string
        return <div style={{fontWeight:'bold', padding:'10px', color:'firebrick'}}>
            {countries}
        </div>
    }
}

const WeatherComponent = ({country, weatherDetails, setWeatherDetails}) => {
    //incomplete. always requests for london
    let capital = country.capital[0]

    useEffect(() => {
        if (capital) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setWeatherDetails([data.main.temp, data.wind.speed, data.weather[0].icon])})
        }
        console.log(weatherDetails)
    //eslint-disable-next-line
    }, [capital])

    return <div>
        <h2>Weather in {capital}</h2>
        <span>temperature: {(weatherDetails[0] - 273.15).toFixed(2)} °Celcius</span>
        <img alt="Icon for Weather" src={`https://openweathermap.org/img/wn/${weatherDetails[2]}@2x.png`}/>
        <span>wind: {weatherDetails[1]} m/s</span>
    </div>
}

export default App