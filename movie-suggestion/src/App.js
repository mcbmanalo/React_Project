import './App.css';
import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TVSeries from './pages/TVSeries';

export const UserContext = React.createContext();
export const MovieContext = React.createContext();
// const key = process.env.REACT_APP_API_KEY
const movieGenreLink = process.env.REACT_APP_MOVIE_GENRE_URI
const tvGenreLink = process.env.REACT_APP_TV_GENRE_URI
const discoverMovie = process.env.REACT_APP_MOVIE_LIST
const discoverTV = process.env.REACT_APP_TV_LIST

const UserProvider = (props) => {
  const {children, generateMovieTV, addSelectedGenre, genres} = props
  return (
    <UserContext.Provider value={{generateMovieTV, addSelectedGenre, genres}}>
      {children}
    </UserContext.Provider>
  )
}

const MovieProvider = (props) => {
  const {children, movieList, tvList} = props
  return (
    <MovieContext.Provider value={{movieList, tvList}}>
      {children}
    </MovieContext.Provider>
  )
}

const getUniqueList = (list, key) => {
  return [...new Map(list.map(item => [item[key], item])).values()]
}

function App() {
  const [selectedGenres, setSelectedGenres] = useState([])
  const [genres, setListofGenres] = useState([])
  const [movieList, setMovieList] = useState([])
  const [tvList, settvList] = useState([])

  const addSelectedGenres = (genre) => {
    if (selectedGenres.includes(genre)) return
    let chosenGenre = [...selectedGenres]
    genres.map((genreItem) => {
      if (genreItem.name === genre) return chosenGenre.push(genreItem)
    })
    console.log(chosenGenre)
    // let newSelectedGenres = [...selectedGenres]
    // newSelectedGenres.push(genre)
    // console.log(newSelectedGenres)
    setSelectedGenres(chosenGenre)
  }

  const getGenres = async() => {
    const movieResponse = await fetch(movieGenreLink)
    const tvResponse = await fetch(tvGenreLink)
    const jsonMovie = await movieResponse.json()
    const jsonTV = await tvResponse.json()
    const listOfGenres = [...jsonMovie.genres, ...jsonTV.genres]
    setListofGenres(getUniqueList(listOfGenres, 'id'))
  }

  const getMovieList = async() => {
    const movieListResponse = await fetch(discoverMovie)
    const jsonMovieList = await movieListResponse.json()
    console.log(jsonMovieList.results)
    setMovieList(jsonMovieList) 
  }
  
  const getTVList = async() => {
    const TVListResponse = await fetch(discoverTV)
    const jsonTVList = await TVListResponse.json()
    settvList(jsonTVList) 
  }

  const generateMovieTV = () => {
    console.log('Add code for choosing random movie')
  }

  useEffect(() => {
    getGenres()
    getMovieList()
    getTVList()
  }, [])
  return (
    <UserProvider generateMovieTV={generateMovieTV} addSelectedGenre={addSelectedGenres} genres={genres}>
      <Router>
        <div className='App'>
          <Switch>
            <Route path="/" component={Home} exact/>
            <MovieProvider movieList={movieList} tvList={tvList}>
              <Route path="/movies" component={Movies}/>
              <Route path="/tv-series" component={TVSeries}/>
            </MovieProvider>
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
