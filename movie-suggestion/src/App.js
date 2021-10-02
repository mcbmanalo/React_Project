import './App.css';
import React, { useState, useEffect } from 'react';
import { 
  Switch,
  Route,
  useHistory
} from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TVSeries from './pages/TVSeries';
import Random from './pages/Random';
import Header from './modules/Header';

export const UserContext = React.createContext();
export const SuggestContext = React.createContext();

const key = process.env.REACT_APP_API_KEY
const movieGenreLink = process.env.REACT_APP_MOVIE_GENRE_URI
const tvGenreLink = process.env.REACT_APP_TV_GENRE_URI

const UserProvider = (props) => {
  const {children, generateMovieTV, isMaxGenre, addSelectedGenre, movieGenre, tvGenre, selectedGenres, resetSelectedGenres, isMovie, setMovieOption} = props
  return (
    <UserContext.Provider value={{generateMovieTV, isMaxGenre, addSelectedGenre, movieGenre, tvGenre, selectedGenres, resetSelectedGenres, isMovie, setMovieOption}}>
      {children}
    </UserContext.Provider>
  )
}

const SuggestProvider = (props) => {
  const {children, suggestedMovie, loading, genres, isMovie} = props
  return (
    <SuggestContext.Provider value={{suggestedMovie, loading, genres, isMovie}}>
      {children}
    </SuggestContext.Provider>
  )
}

const uniqueArray = (Genres) => {
  return [...new Map(Genres.map(item => [item.id, item])).values()]
}

const App = () => {
  const [selectedGenres, setSelectedGenres] = useState([])
  const [movieGenre, setMovieGenre] = useState([])
  const [tvGenre, setTVGenre] = useState([])
  const [genres, setGenres] = useState([])
  const [isMovie, setIsMovie] = useState([true])
  const [suggestedMovie, setSuggestedMovie] = useState({})
  const [loading, setLoading] = useState(false)
  const [isMaxGenre, setIsMaxGenre] = useState(false)
  const history = useHistory();

  const addSelectedGenres = (genre) => {
    const nameOfSelectedGenres = selectedGenres.map(genre => genre.name)

    if (nameOfSelectedGenres.includes(genre)) {
      let removeItem = selectedGenres.findIndex(genre => genre.name === genre)
      let newSelectedGenres = [...selectedGenres]
      newSelectedGenres.splice(removeItem, 1)
      setSelectedGenres(newSelectedGenres)
      setIsMaxGenre(false)
      return
    }

    if (selectedGenres.length === 3) {
      setIsMaxGenre(true)
      return
    }

    let chosenGenre = [...selectedGenres]
    if (isMovie) {
      movieGenre.map((genreItem) => {
        if (genreItem.name === genre) return chosenGenre.push(genreItem)
        return null
      })
      setSelectedGenres(chosenGenre)
      return
    }

    tvGenre.map((genreItem) => {
      if (genreItem.name === genre) return chosenGenre.push(genreItem)
      return null
    })
    setSelectedGenres(chosenGenre)
  }

  const resetSelectedGenres = () => {
    setSelectedGenres([])
    setIsMovie(true)
    setIsMaxGenre(false)
  }

  const setMovieOption = (value) => {
    setIsMovie(value)
    setIsMaxGenre(false)
  }

  const getGenres = async() => {
    const movieResponse = await fetch(movieGenreLink)
    const tvResponse = await fetch(tvGenreLink)
    const jsonMovie = await movieResponse.json()
    const jsonTV = await tvResponse.json()
    const allGenres = uniqueArray([...jsonMovie.genres, ...jsonTV.genres])
    setGenres(allGenres)
    setMovieGenre(jsonMovie.genres)
    setTVGenre(jsonTV.genres)
  }

  const makeDiscoverLink = async(type, includedGenres) => {
    let linkGenres = includedGenres.join('%2C')
    let discoverLink = `https://api.themoviedb.org/3/discover/${type}?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_genres=${linkGenres}`
    const discoverResponse = await fetch(discoverLink)
    const discoverJson = await discoverResponse.json()
    let max = discoverJson.total_pages + 1
    let min = discoverJson.page
    let page = (Math.floor(Math.random() * (max - min)) + min)
    let finalLink = `https://api.themoviedb.org/3/discover/${type}?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${page}&with_genres=${linkGenres}`
    const finalResponse = await fetch(finalLink)
    const finalJson = await finalResponse.json()
    let movie = finalJson.results[Math.floor(Math.random() * finalJson.results.length)]
    setLoading(false)
    setSuggestedMovie(movie)
  }

  const generateMovieTV = () => {
    setLoading(true)
    if(isMovie) {
      const genres = selectedGenres.map((genre) => genre.id)
      makeDiscoverLink('movie', genres)
      history.push('/suggest')
      return
    }
    const genres = selectedGenres.map((genre) => genre.id)
    makeDiscoverLink('tv', genres)
    history.push('/suggest')
  }

  useEffect(() => {
    getGenres()
  }, [])
  
  return (
    <UserProvider 
      generateMovieTV={generateMovieTV} 
      addSelectedGenre={addSelectedGenres}
      selectedGenres={selectedGenres}
      movieGenre={movieGenre} 
      tvGenre={tvGenre} 
      resetSelectedGenres={resetSelectedGenres}
      isMovie={isMovie}
      isMaxGenre={isMaxGenre}
      setMovieOption={setMovieOption}>
        <div className='App'>
          <Header resetSelectedGenres={resetSelectedGenres}/>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/movies" component={Movies}/>
            <Route path="/tv-series" component={TVSeries}/>
            <SuggestProvider suggestedMovie={suggestedMovie} loading={loading} genres={genres} isMovie={isMovie}>
              <Route path="/suggest" component={Random} />
            </SuggestProvider>
          </Switch>
          <div className='TMDb'>
            <div>
              This product uses the TMDB API but is not endorsed or certified by TMDB
            </div>
            <img className='TMDB-logo' alt='TMDB logo' src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'/>
          </div>
        </div>
    </UserProvider>
  );
}

export default App;
